using System.Diagnostics;
using System.Text;
using System.Text.Json;
using backend.Application.Helpers;
using backend.Application.Wrappers;
using backend.Domain.Databases;
using backend.Domain.Dtos;
using backend.Domain.Enums;
using backend.Domain.Interfaces;
using backend.Domain.Models;
using Microsoft.EntityFrameworkCore;
using RabbitMQ.Client;

namespace backend.Application.Endpoints;

public class DadosEndpoints
{
    public static Task<IResult> RollDamage(ApplicationDbContext db, IPersonagemDictionary personagemDictionary,
        PostDiceDto postDiceDto,
        ILogger<DadosEndpoints> logger)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            Habilidades parsed;

            var success = Enum.TryParse<Habilidades>(postDiceDto.Atributo, ignoreCase: true, out parsed);

            if (!success)
            {
                return TypedResults.Json(
                    new ResponseWrapper<string>(true, "Habilidade não esta em um formato correto", null),
                    statusCode: StatusCodes.Status400BadRequest);
            }

            var personagens = await personagemDictionary.GetByIdAsync(postDiceDto.Id);

            if (personagens is null)
            {
                return TypedResults.Json(
                    new ResponseWrapper<string>(true, "Personagem não encontrado", null),
                    statusCode: StatusCodes.Status404NotFound);
            }


            var modificador = personagens.ObterModificador(parsed);

            var sinal = modificador switch
            {
                > 0 => "+",
                _ => string.Empty,
            };

            var rolagem = "2d6" + sinal + (modificador == 0 ? "" : modificador);

            var diceMessage = new RollDiceDto(
                personagens.Nome,
                rolagem,
                null,
                parsed.ToString()
            );

            var json = JsonSerializer.Serialize(diceMessage, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true,
            });


            logger.LogInformation("Rolagem de {@string} {@string}", parsed, rolagem);

            var factory = new ConnectionFactory() { HostName = "localhost", UserName = "user", Password = "password" };

            await using var connection = await factory.CreateConnectionAsync();
            await using var channel = await connection.CreateChannelAsync();

            var body = Encoding.UTF8.GetBytes(json);


            await channel.QueueDeclareAsync(queue: "pushRoll", durable: true, exclusive: false, autoDelete: false,
                arguments: null);
            await channel.BasicPublishAsync(
                exchange: "",
                routingKey: "pushRoll",
                body: body
            );


            return TypedResults.Json(
                new ResponseWrapper<string>(true, "Rolagem publicada", rolagem),
                statusCode: StatusCodes.Status200OK);
        });
    }
}