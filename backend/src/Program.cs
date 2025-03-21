using backend;
using backend.Models;
using backend.Application.Extensions;
using backend.Domain.Databases;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));



var app = builder.Build();
app.ApplyPendingMigrations();


app.MapGroup("/api").RegisterEndpoints();

app.Urls.Add("http://+:8080");

app.Run();
