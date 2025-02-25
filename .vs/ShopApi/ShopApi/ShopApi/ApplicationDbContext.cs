using Microsoft.EntityFrameworkCore;
using ShopApi.Models;
using System.Collections.Generic;

namespace ShopApi
{
  

    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } // This maps to the 'Users' table
        public DbSet<Item> Items { get; set; } // This maps to the 'Users' table

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
        // Connection string to your MySQL database
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("Server=localhost;Port=3307;Database=ransshop;User=root;Password=");
        }
    }
}
