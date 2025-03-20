using backend;
using backend.Models;
using backend.Application.Extensions;
using backend.Domain.Databases;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));



var app = builder.Build();

app.MapGroup("/api").RegisterEndpoints();


app.Run();
