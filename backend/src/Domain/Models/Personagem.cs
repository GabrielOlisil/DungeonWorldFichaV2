namespace backend.Domain.Models;

public record Personagem
{
    public long PersonagemId { get; set; }

    public string? ImageUrl { get; set; }
    
    public string? Nome { get; set; }

    public int Pv { get; set; }

    public int PvTotal { get; set; }

    public int Armadura { get; set; }

    public int DadoDano { get; set; }

    public int Nivel { get; set; }

    public string? Classe { get; set; }

    public string? DescricaoUm { get; set; }

    public string? Equipamento { get; set; }

    public string? DescricaoDois { get; set; }
    
    public Habilidade? Habilidade { get; set; }

    public override string ToString()
    {
        return $"""
                Id = {PersonagemId}
                Nome = {Nome ?? "N/A"}
                Pv = {Pv}
                PvTotal = {PvTotal}
                Armadura = {Armadura}
                DadoDano = {DadoDano}
                Nivel = {Nivel}
                Classe = {Classe ?? "N/A"}
                DescricaoUm = {DescricaoUm ?? "N/A"}
                Equipamento = {Equipamento ?? "N/A"}
                DescricaoDois = {DescricaoDois ?? "N/A"}
                ImageUrl = {ImageUrl ?? "N/A"}
                Habilidade: 
                    Forca = {Habilidade?.Forca ?? 0}
                    Destreza = {Habilidade?.Destreza ?? 0}
                    Constituicao = {Habilidade?.Constituicao ?? 0}
                    Inteligencia = {Habilidade?.Inteligencia ?? 0}
                    Sabedoria = {Habilidade?.Sabedoria ?? 0}
                    Carisma = {Habilidade?.Carisma ?? 0}
                """;
    }
}