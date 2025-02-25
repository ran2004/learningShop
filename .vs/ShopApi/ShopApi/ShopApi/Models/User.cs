using ShopApi.Types;

namespace ShopApi.Models
{
    public class User
    {
        public required string Name { get; set; }

        public int Id { get; set; }

        public bool IsActive { get; set; }

        private string _role;

        public string Role
        {
            get => _role;
            set
            {
                // Validation to only allow Admin or User
                if (value != RoleType.Admin && value != RoleType.User)
                    throw new ArgumentException("Invalid role. Allowed values are: Admin, User");
                _role = value;
            }
        }
    }
}