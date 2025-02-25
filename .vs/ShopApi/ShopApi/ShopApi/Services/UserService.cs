using Microsoft.EntityFrameworkCore;
using ShopApi.Models;
using System;

namespace ShopApi.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> SaveUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentException("User data is required.");
            }

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == user.Id);

            if (existingUser != null)
            {
                existingUser = user;

                return user;
            }

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user; 
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                throw new ArgumentException("Cant find user with the id " + id);
            }

            return user;
        }
    }
}
