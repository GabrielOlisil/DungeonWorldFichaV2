using backend.Application.Endpoints;
using backend.Domain.Databases;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Extensions;

public static class Extensions
{
    public static void RegisterEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("/personagens",   PersonagemEndpoints.PersonagemList);
        group.MapGet("/personagens/{id:long}", PersonagemEndpoints.PersonagemById);
        group.MapPost("/personagens/", PersonagemEndpoints.CreatePersonagem);
        group.MapPatch("/personagens/{id:long}", PersonagemEndpoints.AtualizarPersonagem);

    }
    
    public static void ApplyPendingMigrations(this IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();

        var dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        var pendingMigrations = dbContext.Database.GetPendingMigrations();
        if (!pendingMigrations.Any()) return;

        dbContext.Database.Migrate();
    }
}