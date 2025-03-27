using backend;
using backend.Models;
using backend.Application.Extensions;
using backend.Domain.Databases;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Adicione o URL do seu frontend aqui
            .AllowAnyMethod()                     // Permite qualquer método, incluindo POST
            .AllowAnyHeader()                     // Permite qualquer cabeçalho (como Content-Type)
            .AllowCredentials(); 
    });
});

builder.Services.AddHttpClient("keycloak", builder =>
{
    builder.BaseAddress = new Uri("http://keycloak:8080");
    builder.DefaultRequestHeaders.Add("User-Agent", "dotnet");
}).AddAsKeyed();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));



var app = builder.Build();

app.UseCors("AllowLocalhost3000");
app.ApplyPendingMigrations();


app.MapGroup("/api").RegisterEndpoints();

app.Urls.Add("http://+:8080");

app.Run();
