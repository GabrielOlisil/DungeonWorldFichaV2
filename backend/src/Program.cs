using System.Security.Claims;
using System.Text.Json;
using backend.Application.Extensions;
using backend.Application.Hubs;
using backend.Domain.Databases;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:5173") 
            .AllowAnyMethod()                     
            .AllowAnyHeader()                     
            .AllowCredentials(); 
    });
});

// 🔹 Configuração da autenticação com Keycloak
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "http://localhost:8080/realms/dungeon_world_app";
        options.Audience = "dungeon_client";
        options.RequireHttpsMetadata = false; // Apenas para desenvolvimento

        options.TokenValidationParameters = new TokenValidationParameters()
        {
            NameClaimType = ClaimTypes.Name,
            RoleClaimType = ClaimTypes.Role, // 🔹 Definimos "roles" como padrão
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
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
                    if (roles.TryGetProperty("roles", out var roleArray))
                    {
                        foreach (var role in roleArray.EnumerateArray())
                        {
                            identity.AddClaim(new Claim(ClaimTypes.Role, role.GetString()));
                        }
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

app.Urls.Add("http://+:8000");
app.MapHub<PersonagemHub>("/personagensHub").RequireCors("AllowLocalhost3000");

app.Run();