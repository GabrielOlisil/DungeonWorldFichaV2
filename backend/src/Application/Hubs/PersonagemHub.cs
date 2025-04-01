using backend.Domain.Models;
using Microsoft.AspNetCore.SignalR;

namespace backend.Application.Hubs;

public class PersonagemHub : Hub
{
    public async Task NewMessage(Personagem person) =>
        await Clients.All.SendAsync("messageReceived", person);
    
    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }
    
    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }
}