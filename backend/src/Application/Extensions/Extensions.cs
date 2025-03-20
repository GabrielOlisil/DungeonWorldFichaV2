using backend.Application.Endpoints;

namespace backend.Application.Extensions;

public static class Extensions
{
    public static void RegisterEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("/personagens", PersonagemEndpoints.PersonagemList);
        group.MapGet("/personagens/{id:long}", PersonagemEndpoints.PersonagemById);
        group.MapPost("/personagens/", PersonagemEndpoints.CreatePersonagem);
    }
}