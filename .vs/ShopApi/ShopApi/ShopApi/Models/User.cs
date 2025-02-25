namespace ShopApi.Models
{
    public class User
    {
        public required string Name { get; set; }

        public int Id { get; set; }

        public bool IsActive { get; set; }

        public required string Role { get; set; }
    }
}