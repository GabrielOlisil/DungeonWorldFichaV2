using backend.Domain.Enums;

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

    public int ObterModificador(Habilidades atributo)
    {
        if (Habilidade is null)
            return 0;

        var nome = atributo.ToString(); // Ex: "Forca"
        var propriedade = typeof(Habilidade).GetProperty(nome);

        if (propriedade == null)
            throw new ArgumentException($"Atributo '{atributo}' inválido.");

        var valor = (int)(propriedade.GetValue(Habilidade) ?? 0);
        return CalcularModificador(valor);
    }

    private int CalcularModificador(int valor)
    {
        return valor switch
        {
            18 => 3,
            >= 16 => 2,
            >= 13 => 1,
            >= 9 => 0,
            >= 6 => -1,
            >= 4 => -2,
            _ => -3
        };
    }
}