using backend.Application.Helpers;
using backend.Application.Hubs;
using backend.Domain.Databases;
using backend.Extensions.Application.Interfaces;
using backend.Domain.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Endpoints;

public static class PersonagemEndpoints
{
    public static Task<IResult> PersonagemList(ApplicationDbContext db)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            var personagens = await db.Personagens
                .ToListAsync();


            return personagens.Count > 0
                ? TypedResults.Json(
                    new ResponseInterface<List<Personagem>>(true, "Personagens encontrados", personagens),
                    statusCode: StatusCodes.Status200OK)
                : TypedResults.Json(
                    new ResponseInterface<List<Personagem>>(false, "Nenhum personagem encontrado.", null),
                    statusCode: StatusCodes.Status404NotFound);
        });
    }

    public static Task<IResult> PersonagemById(ApplicationDbContext db, long id)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            var personagem = await db.Personagens
                .Include(p => p.Habilidade)
                .FirstOrDefaultAsync(p => p.PersonagemId == id);

            return personagem is not null
                ? TypedResults.Json(new ResponseInterface<Personagem>(true, "Personagem encontrado", personagem),
                    statusCode: StatusCodes.Status200OK)
                : TypedResults.Json(new ResponseInterface<Personagem>(false, "Personagem não encontrado.", null),
                    statusCode: StatusCodes.Status404NotFound);
        });
    }


    public static Task<IResult> CreatePersonagem(ApplicationDbContext db, Personagem personagem)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            db.Personagens.Add(personagem);


            return await db.SaveChangesAsync() != 0
                ? TypedResults.Json(
                    new ResponseInterface<Personagem>(true, "Personagem inserido com sucesso", personagem),
                    statusCode: StatusCodes.Status201Created)
                : TypedResults.Json(new ResponseInterface<Personagem>(false, "Personagem não inserido.", null),
                    statusCode: StatusCodes.Status400BadRequest);
        });
    }


    public static Task<IResult> AtualizarPersonagem(ApplicationDbContext db, IHubContext<PersonagemHub> personagemHub, long id, Personagem personagem)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            // Verificando se o personagem é nulo
            if (personagem == null)
            {
                return TypedResults.Json(
                    new ResponseInterface<Personagem>(false, "Personagem fornecido é inválido.", null),
                    statusCode: StatusCodes.Status400BadRequest);
            }


            var oldPersonagem = await db.Personagens.Include(p => p.Habilidade)
                .FirstOrDefaultAsync(p => p.PersonagemId == id);



            if (oldPersonagem == null)
            {
                return TypedResults.Json(new ResponseInterface<Personagem>(false, "Personagem não existe.", null),
                    statusCode: StatusCodes.Status400BadRequest);
            }

            // Verificando se a habilidade é nula
            if (personagem.Habilidade == null)
            {
                return TypedResults.Json(
                    new ResponseInterface<Personagem>(false, "Habilidade do personagem não fornecida.", null),
                    statusCode: StatusCodes.Status400BadRequest);
            }

            // Atualizando os campos do personagem
            oldPersonagem.Armadura = personagem.Armadura;
            oldPersonagem.Classe = personagem.Classe;
            oldPersonagem.Equipamento = personagem.Equipamento;
            oldPersonagem.Nivel = personagem.Nivel;
            oldPersonagem.Nome = personagem.Nome;
            oldPersonagem.Pv = personagem.Pv;
            oldPersonagem.PvTotal = personagem.PvTotal;
            oldPersonagem.DadoDano = personagem.DadoDano;
            oldPersonagem.DescricaoDois = personagem.DescricaoDois;
            oldPersonagem.DescricaoUm = personagem.DescricaoUm;
            oldPersonagem.ImageUrl = personagem.ImageUrl;
            oldPersonagem.Habilidade.Forca = personagem.Habilidade.Forca;
            oldPersonagem.Habilidade.Inteligencia = personagem.Habilidade.Inteligencia;
            oldPersonagem.Habilidade.Sabedoria = personagem.Habilidade.Sabedoria;
            oldPersonagem.Habilidade.Destreza = personagem.Habilidade.Destreza;
            oldPersonagem.Habilidade.Constituicao = personagem.Habilidade.Constituicao;
            oldPersonagem.Habilidade.Carisma = personagem.Habilidade.Carisma;

            Console.WriteLine("chegou");

            db.Personagens.Update(oldPersonagem);

            if (await db.SaveChangesAsync() != 0)
            {
                await personagemHub.Clients.Group(personagem.PersonagemId.ToString())
                    .SendAsync("messageReceived", personagem);
                
                await personagemHub.Clients.Group("geral")
                    .SendAsync("messageReceived", personagem);
                
                return TypedResults.Json(
                    new ResponseInterface<Personagem>(true, "Personagem Atualizado com sucesso",
                        FindByIdStrict(db, id)), statusCode: StatusCodes.Status200OK);
            }
            

            // Verificando se as alterações foram salvas
            return  TypedResults.Json(new ResponseInterface<Personagem>(false, "Personagem não atualizado.", null),
                    statusCode: StatusCodes.Status400BadRequest);
        });
    }


    public static Task<IResult> AtualizarPersonagemPartial(ApplicationDbContext db, long id, Personagem personagem)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            var oldPersonagem = await db.Personagens
                .Include(p => p.Habilidade)
                .FirstOrDefaultAsync(p => p.PersonagemId == id);

            var hasChanges = false;
            if (oldPersonagem is null)
            {
                return TypedResults.Json(new ResponseInterface<Personagem>(false, "Personagem não inserido.", null),
                    statusCode: StatusCodes.Status400BadRequest);
            }

            if (!string.IsNullOrEmpty(personagem.Nome))
            {
                oldPersonagem.Nome = personagem.Nome;
                hasChanges = true;
            }

            if (personagem.Pv > 0)
            {
                oldPersonagem.Pv = personagem.Pv;
                hasChanges = true;
            }

            if (personagem.PvTotal > 0)
            {
                oldPersonagem.PvTotal = personagem.PvTotal;
                hasChanges = true;
            }

            if (personagem.Armadura > 0)
            {
                oldPersonagem.Armadura = personagem.Armadura;
                hasChanges = true;
            }

            if (personagem.DadoDano > 0)
            {
                oldPersonagem.DadoDano = personagem.DadoDano;
                hasChanges = true;
            }

            if (personagem.Nivel > 0)
            {
                oldPersonagem.Nivel = personagem.Nivel;
                hasChanges = true;
            }

            if (!string.IsNullOrEmpty(personagem.Classe))
            {
                oldPersonagem.Classe = personagem.Classe;
                hasChanges = true;
            }

            if (!string.IsNullOrEmpty(personagem.DescricaoUm))
            {
                oldPersonagem.DescricaoUm = personagem.DescricaoUm;
                hasChanges = true;
            }

            if (!string.IsNullOrEmpty(personagem.Equipamento))
            {
                oldPersonagem.Equipamento = personagem.Equipamento;
                hasChanges = true;
            }

            if (!string.IsNullOrEmpty(personagem.DescricaoDois))
            {
                oldPersonagem.DescricaoDois = personagem.DescricaoDois;
                hasChanges = true;
            }

            if (personagem.Habilidade != null)
            {
                oldPersonagem.Habilidade = personagem.Habilidade;
                hasChanges = true;
            }


            if (!hasChanges)
            {
                return TypedResults.Json(
                    new ResponseInterface<Personagem>(false, "Personagem não Atualizado", FindByIdStrict(db, id)),
                    statusCode: StatusCodes.Status422UnprocessableEntity);
            }

            db.Personagens.Update(oldPersonagem);


            return await db.SaveChangesAsync() != 0
                ? TypedResults.Json(
                    new ResponseInterface<Personagem>(true, "Personagem Atualizado com sucesso", personagem),
                    statusCode: StatusCodes.Status200OK)
                : TypedResults.Json(new ResponseInterface<Personagem>(false, "Personagem não atualizado.", null),
                    statusCode: StatusCodes.Status400BadRequest);
        });
    }


    public static Task<IResult> DeletePersonagem(ApplicationDbContext db, long id)
    {
        return ErrorHandler.HandleErrorWithNoLogAsync(async () =>
        {
            var personagem = await db.Personagens
                .Include(p => p.Habilidade)
                .FirstOrDefaultAsync(p => p.PersonagemId == id);

            if (personagem is null)
            {
                return TypedResults.Json(new ResponseInterface<Personagem>(false, "Personagem não encontrado.", null),
                    statusCode: StatusCodes.Status404NotFound);
            }

            db.Personagens.Remove(personagem);

            return await db.SaveChangesAsync() != 0
                ? TypedResults.Json(
                    new ResponseInterface<Personagem>(true, "Personagem deletado com sucesso", personagem),
                    statusCode: StatusCodes.Status200OK)
                : TypedResults.Json(new ResponseInterface<Personagem>(false, "Personagem não deletado.", null),
                    statusCode: StatusCodes.Status400BadRequest);
        });
    }

    static Personagem? FindByIdStrict(ApplicationDbContext db, long id)
    {
        return db.Personagens
            .Include(p => p.Habilidade)
            .FirstOrDefault(p => p.PersonagemId == id);
    }
}