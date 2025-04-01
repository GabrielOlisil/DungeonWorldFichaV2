using backend;
using backend.Domain.Models;
using backend.Application.Extensions;
using backend.Application.Hubs;
using backend.Domain.Databases;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();


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


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), 
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));



var app = builder.Build();


app.UseCors("AllowLocalhost3000");
app.ApplyPendingMigrations();


app.MapGroup("/api").RegisterEndpoints();

app.Urls.Add("http://+:8080");
app.MapHub<PersonagemHub>("/personagensHub").RequireCors("AllowLocalhost3000");


app.Run();
