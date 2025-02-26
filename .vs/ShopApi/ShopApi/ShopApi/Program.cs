using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShopApi;
using ShopApi.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Register ApplicationDbContext with SQLite as the provider
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))); // Use SQLite instead of MySQL

// Register your services
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ItemService>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", builder =>
        builder.WithOrigins("http://localhost:4200")  // Ensure the correct frontend URL
               .AllowAnyMethod()
               .AllowAnyHeader());
});

// Configure JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero,  // Default is 5 minutes, setting to zero will remove the clock skew allowance
            ValidIssuer = builder.Configuration["Jwt:Issuer"], // "ShopAppIssuer"
            ValidAudience = builder.Configuration["Jwt:Audience"], // "MobileApp"
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])) // Secret key for signing JWT tokens
        };
    });

// Add services to the container for controllers
builder.Services.AddControllers();

// Add Swagger for API documentation (only in development)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS to allow localhost requests
app.UseCors("AllowLocalhost");

// Ensure authentication middleware is added before authorization
app.UseAuthentication();  // Make sure authentication middleware is called before authorization
app.UseAuthorization();

// Map controllers to routes
app.MapControllers();

// Start the app
app.Run();
