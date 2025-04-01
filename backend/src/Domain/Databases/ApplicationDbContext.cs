using backend.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Domain.Databases;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Personagem> Personagens { get; set; }
    public DbSet<Habilidade> Habilidades { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Personagem>(builder =>
        {
            builder.HasKey(p => p.PersonagemId); // Define a chave primária
            builder.Property(p => p.PersonagemId)
                .ValueGeneratedOnAdd(); // Auto incremento
        });

        modelBuilder.Entity<Habilidade>(builder =>
        {
            builder.HasKey(p => p.Id); // Define a chave primária
            builder.Property(p => p.Id)
                .ValueGeneratedOnAdd(); // Auto incremento
        });
    }
}