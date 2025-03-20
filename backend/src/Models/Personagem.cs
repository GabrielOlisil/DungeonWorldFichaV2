using System.ComponentModel.DataAnnotations;


namespace backend.Models;

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
                Id = {PersonagemId.ToString()}
                Nome = {Nome ?? ""}
                Pv = {Pv.ToString()}
                Armadura = {Armadura.ToString()}
                DadoDano = {DadoDano.ToString()}
                Nivel = {Nivel.ToString()}
                """;
    }
}