using backend.Application.Helpers;
using backend.Domain.Databases;
using backend.Domain.Models;
using backend.Extensions.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Endpoints;

public class DadosEndpoints
{
    public static Task<IResult> RollDamage(ApplicationDbContext db, long id, ILogger<DadosEndpoints> logger)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            var personagens = await  db.Personagens
                .FirstOrDefaultAsync(p => p.PersonagemId == id);

            if (personagens is null)
            {
                return  TypedResults.Json(
                    new ResponseInterface<string>(true, "Personagem não encontrado", null),
                    statusCode: StatusCodes.Status404NotFound);
            }
            
            logger.LogInformation($"Rolagem de dados para {personagens.Nome}: com dado {personagens.DadoDano}");

            return  TypedResults.Json(
                new ResponseInterface<string>(true, "Rolagem feita", "2d20=> 4 + 1 => 5"),
                statusCode: StatusCodes.Status200OK);
        });
    }
}