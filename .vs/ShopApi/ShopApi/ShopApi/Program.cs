using Microsoft.EntityFrameworkCore;
using ShopApi; // Namespace for ApplicationDbContext

var builder = WebApplication.CreateBuilder(args);

// Register ApplicationDbContext with MySQL as the provider
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySQL("Server=localhost;Port=3307;Database=ransshop;User=root;Password="));

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
