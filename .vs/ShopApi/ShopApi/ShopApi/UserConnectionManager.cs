using Microsoft.AspNetCore.SignalR;

namespace ShopApi
{
    public class UserConnectionManager
    {
        private readonly Dictionary<string, HashSet<string>> _userConnections = new();

        public void AddConnection(string userId, string connectionId)
        {
            if (userId != null)
            {
                if (!_userConnections.ContainsKey(userId))
                {
                    _userConnections[userId] = new HashSet<string>();
                }
                _userConnections[userId].Add(connectionId);
            }
        }

        public void RemoveConnection(string userId, string connectionId)
        {
            if (userId != null && _userConnections.ContainsKey(userId))
            {
                _userConnections[userId].Remove(connectionId);
                if (_userConnections[userId].Count == 0)
                {
                    _userConnections.Remove(userId);
                }
            }
        }

        public IEnumerable<string> GetConnectedUsers()
        {
            return _userConnections.Keys;
        }
    }
}
