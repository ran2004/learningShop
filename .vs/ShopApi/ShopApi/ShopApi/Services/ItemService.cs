using Microsoft.EntityFrameworkCore;
using ShopApi.Models;
using System;

namespace ShopApi.Services
{
    public class ItemService
    {
        private readonly AppDbContext _context;

        public ItemService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Item>> GetAllItemsAsync()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<Item> SaveItem(Item item)
        {
            if (item == null)
            {
                throw new ArgumentException("Item data is required.");
            }

            var existingItem = await _context.Items
                .FirstOrDefaultAsync(i => i.Id == item.Id);

            if (existingItem != null)
            {
                existingItem = item;
            }
            else
            {
                await _context.Items.AddAsync(item);
            }

            await _context.SaveChangesAsync();

            return item;
        }

        public async Task<Item> BuyItem(int id)
        {
            var item = await _context.Items
                .FirstOrDefaultAsync(i => i.Id == id);
            if (item == null)
            {
                throw new ArgumentException($"Item with ID {id} not found.");
            }

            if (item.Amount == 0)
            {
                throw new ArgumentException($"Item with ID {id} sold out.");
            }
            item.Amount--;

            await _context.SaveChangesAsync();

            return item;
        }

        public async Task<Item> AddItem(int id)
        {
            var item = await _context.Items
                .FirstOrDefaultAsync(i => i.Id == id);
            if (item == null)
            {
                throw new ArgumentException($"Item with ID {id} not found.");
            }
            item.Amount++;

            await _context.SaveChangesAsync();

            return item;
        }

        public async Task<bool> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
