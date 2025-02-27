using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using MySqlX.XDevAPI;
using Org.BouncyCastle.Utilities;
using ShopApi;
using System.Security.Claims;

[Authorize]
public class UsersHub : Hub
{
    private readonly UserConnectionManager _connectionManager;

    public UsersHub(UserConnectionManager connectionManager)
    {
        _connectionManager = connectionManager;
    }

    public override Task OnConnectedAsync()
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        _connectionManager.AddConnection(userId, Context.ConnectionId);
        Clients.All.SendAsync("receiveuserlist", _connectionManager.GetConnectedUsers());
        return base.OnConnectedAsync();
    }


    public override Task OnDisconnectedAsync(Exception exception)
    {
        // Get the user identifier from the connection
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        // Remove the connection from the connection manager
        _connectionManager.RemoveConnection(userId, Context.ConnectionId);

        // Notify all clients about the updated user list
        Clients.All.SendAsync("receiveuserlist", _connectionManager.GetConnectedUsers());

        return base.OnDisconnectedAsync(exception);
    }

    [Authorize(Roles = "Admin")]
    public Task GetConnectedUsers()
    {
        var connectedUsers = _connectionManager.GetConnectedUsers();
        return Clients.Caller.SendAsync("receiveuserlist", connectedUsers);
    }
}
