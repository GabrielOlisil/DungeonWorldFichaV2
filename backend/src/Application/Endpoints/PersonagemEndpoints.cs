using backend.Domain.Databases;
using backend.Extensions.Application.Interfaces;
using backend.Models;

namespace backend.Application.Endpoints;

public static class PersonagemEndpoints
{
    public static IResult PersonagemList(ApplicationDbContext db)
    {
        var personagens = db.Personagens.ToList();

        
        return personagens.Count > 0 
            ? TypedResults.Json(new ResponseInterface<List<Personagem>>(true, "Personagens encontrados", personagens), 
                statusCode: StatusCodes.Status200OK)
            : TypedResults.Json(new ResponseInterface<List<Personagem>>(false, "Nenhum personagem encontrado.", null), 
                statusCode: StatusCodes.Status404NotFound);
    }

    public static IResult PersonagemById(ApplicationDbContext db, long id)
    {
        var personagem = db.Personagens.Find(id);

        return personagem is not null
            ? TypedResults.Json(new ResponseInterface<Personagem>(true, "Personagem encontrado", personagem), 
                statusCode: StatusCodes.Status200OK)
            : TypedResults.Json(new ResponseInterface<Personagem>(false, "Nenhum personagem encontrado.", null), 
                statusCode: StatusCodes.Status404NotFound);
    }


    public static IResult CreatePersonagem(ApplicationDbContext db, Personagem personagem)
    {
        db.Personagens.Add(personagem);

        if (db.SaveChanges() != 1)
        {
            return TypedResults.Json(new ResponseInterface<Personagem>(true, "Personagem inserido com sucesso", personagem), 
                statusCode: StatusCodes.Status201Created);
         
        }
        
        return TypedResults.Json(new ResponseInterface<Personagem>(false, "Personagem não inserido.", null), 
            statusCode: StatusCodes.Status400BadRequest);
    }
    
}