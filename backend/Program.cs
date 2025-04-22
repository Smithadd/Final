using Microsoft.EntityFrameworkCore;
using backend.Models; // Replace with the actual namespace of your generated context

var builder = WebApplication.CreateBuilder(args);

// ✅ Add services BEFORE building the app
builder.Services.AddDbContext<EntertainmentAgencyExampleContext>(options =>
    options.UseSqlite("Data Source=EntertainmentAgencyExample.sqlite"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddControllers(); // ✅ Required to use [ApiController] controllers
builder.Services.AddOpenApi();     // Optional: Swagger/OpenAPI

var app = builder.Build();

// ✅ Configure the HTTP request pipeline
app.UseCors("AllowAll");
app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // Swagger if desired
}

app.MapControllers(); // ✅ THIS LINE maps /api/... endpoints to your controllers

// (Optional demo endpoint — safe to keep)
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
