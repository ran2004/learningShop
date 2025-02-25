using Microsoft.EntityFrameworkCore;
using ShopApi.Models;
using System.Collections.Generic;

namespace ShopApi
{
  

    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } // This maps to the 'Users' table
        public DbSet<Item> Items { get; set; } // This maps to the 'Users' table

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>(); 
        }

    }
}
