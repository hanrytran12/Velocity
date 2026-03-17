using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Persistence;

public class VelocityDbContextFactory : IDesignTimeDbContextFactory<VelocityDbContext>
{
    public VelocityDbContext CreateDbContext(string[] args)
    {
        var apiPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "API");

        if (!Directory.Exists(apiPath))
        {
            apiPath = Directory.GetCurrentDirectory();
        }

        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(apiPath)
            .AddJsonFile("appsettings.json")
            .Build();

        var builder = new DbContextOptionsBuilder<VelocityDbContext>();
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        builder.UseNpgsql(connectionString,
            m => m.MigrationsAssembly(typeof(VelocityDbContext).Assembly.FullName));

        return new VelocityDbContext(builder.Options);
    }
}
