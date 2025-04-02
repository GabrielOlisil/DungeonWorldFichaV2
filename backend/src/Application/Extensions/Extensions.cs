using backend.Application.Endpoints;
using backend.Domain.Databases;
using backend.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace backend.Application.Extensions;

public static class Extensions
{
    public static void RegisterEndpoints(this RouteGroupBuilder group)
    {
        group.MapGet("/personagens",   PersonagemEndpoints.PersonagemList).RequireAuthorization(opt =>
        {
            opt.RequireRole("player");
        });
        group.MapGet("/personagens/{id:long}", PersonagemEndpoints.PersonagemById).RequireAuthorization();
        group.MapPost("/personagens/", PersonagemEndpoints.CreatePersonagem).RequireAuthorization();
        group.MapPatch("/personagens/{id:long}", PersonagemEndpoints.AtualizarPersonagemPartial).RequireAuthorization();
        group.MapDelete("/personagens/{id:long}", PersonagemEndpoints.DeletePersonagem).RequireAuthorization();
        group.MapPut("/personagens/{id:long}", PersonagemEndpoints.AtualizarPersonagem).RequireAuthorization();
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