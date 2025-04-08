using Microsoft.AspNetCore.SignalR;

namespace backend.Application.Hubs;

public class DadosHub: Hub
{
    public async Task JoinGroupGeral()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "geral");
    }
}