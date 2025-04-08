namespace backend.Domain.Dtos;

public record RollDiceDto(string Personagem, string DicePrompt, string? Output, string Modalidade)
{
}