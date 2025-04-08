using System.Text;
using System.Text.Json;
using backend.Application.Hubs;
using backend.Domain.Dtos;
using Microsoft.AspNetCore.SignalR;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;


namespace backend.Application.BackgroundServices;

public class DiceConsumer(ILogger<DiceConsumer> logger, IHubContext<DadosHub> dadosContext) : BackgroundService
{
    private readonly ConnectionFactory _factory = new() { HostName = "rabbitmq", UserName = "user", Password = "password" };


    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("🎲 DiceConsumer iniciado");
        await using var connection = await _factory.CreateConnectionAsync(stoppingToken);
        await using var channel = await connection.CreateChannelAsync(cancellationToken: stoppingToken);
        await channel.QueueDeclareAsync(
            queue: "RollResult",
            durable: true,
            exclusive: false,
            autoDelete: false,
            arguments: null,
            cancellationToken: stoppingToken);

        var consumer = new AsyncEventingBasicConsumer(channel);
        consumer.ReceivedAsync += async (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            var jsonparsed = JsonSerializer.Deserialize<RollDiceDto>(message, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true,
            });

            logger.LogInformation("Recebido rolagem de dados: {Message}", message);


            await dadosContext.Clients.Group("geral")
                .SendAsync("messageReceived", message, cancellationToken: stoppingToken); // isso aqui ta dando erro
        };

        await channel.BasicConsumeAsync(
            queue: "RollResult",
            autoAck: true,
            consumer: consumer,
            cancellationToken: stoppingToken
        );

        // Mantém o background service vivo
        await Task.Delay(Timeout.Infinite, stoppingToken);

        logger.LogInformation("🛑 DiceConsumer foi cancelado");
    }
}