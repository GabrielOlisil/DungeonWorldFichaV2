using System.Security.Claims;
using System.Text.Json;
using backend.Application.BackgroundServices;
using backend.Application.Dictionaries;
using backend.Application.Endpoints;
using backend.Application.Extensions;
using backend.Application.Hubs;
using backend.Domain.Databases;
using backend.Domain.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IPersonagemDictionary, PersonagemDictionary>();
builder.Services.AddSignalR();
builder.Services.AddHostedService<DiceConsumer>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// 🔹 Configuração da autenticação com Keycloak
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {

        // Para as demais operações, podemos deixar a Authority (não será usada para buscar metadados, pois MetadataAddress foi definido)
        options.Audience = "account";
        options.RequireHttpsMetadata = false; // Apenas para desenvolvimento
        options.MetadataAddress = builder.Configuration["Keycloak:MetadataAddress"]!;

        options.TokenValidationParameters = new TokenValidationParameters()
        {

            ValidateIssuer = false,
            ValidIssuer = builder.Configuration["Keycloak:ValidIssuer"],


            ValidateAudience = false,
            ValidateIssuerSigningKey = false,

        };

        options.Events = new JwtBearerEvents
        {
            OnTokenValidated = context =>
            {
                var identity = (ClaimsIdentity)context.Principal.Identity;
                var roleClaims = context.Principal.FindFirst("realm_access")?.Value;

                if (!string.IsNullOrEmpty(roleClaims))
                {
                    var roles = JsonSerializer.Deserialize<JsonElement>(roleClaims);
                    if (!roles.TryGetProperty("roles", out var roleArray)) return Task.CompletedTask;
                    foreach (var role in roleArray.EnumerateArray())
                    {
                        identity.AddClaim(new Claim(ClaimTypes.Role, role.GetString()));
                    }
                }


                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

var app = builder.Build();

app.UseCors("AllowLocalhost3000");
app.UseAuthentication(); // 🔹 Precisa estar antes do Authorization
app.UseAuthorization();
app.ApplyPendingMigrations();

app.MapGroup("/api").RegisterEndpoints();

app.Urls.Add("http://+:8080");
app.MapHub<PersonagemHub>("/personagensHub").RequireCors("AllowLocalhost3000");
app.MapHub<DadosHub>("/dadosHub").RequireCors("AllowLocalhost3000");

app.Run();