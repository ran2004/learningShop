using Microsoft.EntityFrameworkCore;
using ShopApi;
using ShopApi.Services; // Namespace for ApplicationDbContext

var builder = WebApplication.CreateBuilder(args);

// Register ApplicationDbContext with SQLite as the provider
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))); // Use SQLite instead of MySQL
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ItemService>();

// Add services to the container.
builder.Services.AddControllers();

// Add other necessary services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
