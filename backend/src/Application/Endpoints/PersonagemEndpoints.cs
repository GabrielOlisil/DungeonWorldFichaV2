using backend.Application.Helpers;
using backend.Application.Hubs;
using backend.Application.Wrappers;
using backend.Domain.Databases;
using backend.Domain.Interfaces;
using backend.Domain.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Endpoints;

public class PersonagemEndpoints
{
    public static Task<IResult> PersonagemList
        (ApplicationDbContext db, IPersonagemDictionary personagemDictionary, ILogger<PersonagemEndpoints> logger)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            var personagens = await personagemDictionary.GetAllAsync();


            if (personagens.Count > 0)
            {
                logger.LogInformation("{Count} Personagens Encontrados", personagens.Count);

                return TypedResults.Json(
                    new ResponseWrapper<List<Personagem>>(true, "Personagens encontrados", personagens),
                    statusCode: StatusCodes.Status200OK);
            }

            logger.LogInformation("Nenhum personagem encontrado");

            return TypedResults.Json(
                new ResponseWrapper<List<Personagem>>(false, "Nenhum personagem encontrado.", null),
                statusCode: StatusCodes.Status404NotFound);
        });
    }

    public static Task<IResult> PersonagemById(ApplicationDbContext db, IPersonagemDictionary personagemDictionary, long id)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            var personagem = await personagemDictionary.GetByIdAsync(id);

            return personagem is not null
                ? TypedResults.Json(new ResponseWrapper<Personagem>(true, "Personagem encontrado", personagem),
                    statusCode: StatusCodes.Status200OK)
                : TypedResults.Json(new ResponseWrapper<Personagem>(false, "Personagem não encontrado.", null),
                    statusCode: StatusCodes.Status404NotFound);
        });
    }


    public static Task<IResult> CreatePersonagem(ApplicationDbContext db, IPersonagemDictionary personagemDictionary,
        Personagem? personagem)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            if (personagem is null)
            {
                return TypedResults.Json(
                    new ResponseWrapper<Personagem>(false, "Personagem inválido ou ausente.", null),
                    statusCode: StatusCodes.Status400BadRequest);
            }

            var result = await personagemDictionary.AddToDbAsync(personagem);


            return result is not null
                ? TypedResults.Json(
                    new ResponseWrapper<Personagem>(true, "Personagem inserido com sucesso", personagem),
                    statusCode: StatusCodes.Status201Created)
                : TypedResults.Json(new ResponseWrapper<Personagem>(false, "Personagem não inserido.", null),
                    statusCode: StatusCodes.Status400BadRequest);
        });
    }


    public static Task<IResult> AtualizarPersonagem(ApplicationDbContext db, IPersonagemDictionary personagemDictionary,
        IHubContext<PersonagemHub> personagemHub,
        long id, Personagem? personagem)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {

            // Verificando se o personagem é nulo
            if (personagem == null)
            {
                return TypedResults.Json(
                    new ResponseWrapper<Personagem>(false, "Personagem fornecido é inválido.", null),
                    statusCode: StatusCodes.Status400BadRequest);
            }

            var result = await personagemDictionary.UpdateInDbAsync(id, personagem);



            if (result is not null)
            {
                await personagemHub.Clients.Group(personagem.PersonagemId.ToString())
                    .SendAsync("messageReceived", personagem);

                await personagemHub.Clients.Group("geral")
                    .SendAsync("messageReceived", personagem);

                var person = await personagemDictionary.GetByIdAsync(id);

                return TypedResults.Json(
                    new ResponseWrapper<Personagem>(true, "Personagem Atualizado com sucesso",
                        person), statusCode: StatusCodes.Status200OK);
            }


            // Verificando se as alterações foram salvas
            return TypedResults.Json(new ResponseWrapper<Personagem>(false, "Personagem não atualizado.", null),
                statusCode: StatusCodes.Status400BadRequest);
        });
    }




    public static Task<IResult> DeletePersonagem(ApplicationDbContext db, IPersonagemDictionary personagemDictionary, long id)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            var result = await personagemDictionary.DeleteInDbAsync(id);

            if (!result)
            {
                return TypedResults.Json(new ResponseWrapper<Personagem>(false, "Personagem não encontrado.", null),
                    statusCode: StatusCodes.Status404NotFound);
            }

            var person = await personagemDictionary.GetByIdAsync(id);

            return TypedResults.Json(
                    new ResponseWrapper<Personagem>(true, "Personagem deletado com sucesso", person),
                    statusCode: StatusCodes.Status200OK);
        });
    }


}