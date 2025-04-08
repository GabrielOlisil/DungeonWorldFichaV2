using backend.Domain.Databases;
using backend.Domain.Interfaces;
using backend.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Dictionaries;

public class PersonagemDictionary(ApplicationDbContext dbContext, ILogger<PersonagemDictionary> logger)
    : IPersonagemDictionary
{
    public async Task<Personagem?> AddToDbAsync(Personagem entity)
    {
        dbContext.Personagens.Add(entity);

        return await dbContext.SaveChangesAsync() > 0 ? entity : null;
    }

    public async Task<Personagem?> UpdateInDbAsync(long id, Personagem entity)
    {
        var oldPersonagem = await GetByIdAsync(id);

        if (oldPersonagem?.Habilidade == null || entity.Habilidade == null) return null;

        oldPersonagem.Armadura = entity.Armadura;
        oldPersonagem.Classe = entity.Classe;
        oldPersonagem.Equipamento = entity.Equipamento;
        oldPersonagem.Nivel = entity.Nivel;
        oldPersonagem.Nome = entity.Nome;
        oldPersonagem.Pv = entity.Pv;
        oldPersonagem.PvTotal = entity.PvTotal;
        oldPersonagem.DadoDano = entity.DadoDano;
        oldPersonagem.DescricaoDois = entity.DescricaoDois;
        oldPersonagem.DescricaoUm = entity.DescricaoUm;
        oldPersonagem.ImageUrl = entity.ImageUrl;
        oldPersonagem.Habilidade.Forca = entity.Habilidade.Forca;
        oldPersonagem.Habilidade.Inteligencia = entity.Habilidade.Inteligencia;
        oldPersonagem.Habilidade.Sabedoria = entity.Habilidade.Sabedoria;
        oldPersonagem.Habilidade.Destreza = entity.Habilidade.Destreza;
        oldPersonagem.Habilidade.Constituicao = entity.Habilidade.Constituicao;
        oldPersonagem.Habilidade.Carisma = entity.Habilidade.Carisma;


        dbContext.Personagens.Update(oldPersonagem);

        var changes = await dbContext.SaveChangesAsync();

        return changes > 0 ? oldPersonagem : null;
    }

    public async Task<bool> DeleteInDbAsync(long id)
    {
        var personagem = await GetByIdAsync(id);

        if (personagem is null) return false;


        dbContext.Personagens.Remove(personagem);

        return await dbContext.SaveChangesAsync() != 0;
    }

    public Task<Personagem?> GetByIdAsync(long id)
    {
        return dbContext.Personagens
            .Where(p => p.PersonagemId == id)
            .Include(p => p.Habilidade)
            .FirstOrDefaultAsync();
    }

    public Task<List<Personagem>> GetAllAsync()
    {
        return dbContext.Personagens.ToListAsync();
    }
}