namespace ShopApi.Models
{
    public class Item
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public int Price { get; set; }

        public int Amount { get; set; }
    }
}