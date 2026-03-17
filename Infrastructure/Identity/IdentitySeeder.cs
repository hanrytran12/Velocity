using Domain.Constants;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Identity;

public static class IdentitySeeder
{
    public static async Task SeedRolesAndAdminAsync(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        string[] roles = { UserRoles.Admin, UserRoles.Customer, UserRoles.Shipper };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>(role));
            }
        }

        var adminEmail = "admin@velocity.com";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);

        if (adminUser == null)
        {
            adminUser = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                FullName = "System Admin",
                EmailConfirmed = true,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            var result = await userManager.CreateAsync(adminUser, "Admin@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, UserRoles.Admin);
            }
        }

        // Seed Customer
        var customerEmail = "customer@velocity.com";
        var customerUser = await userManager.FindByEmailAsync(customerEmail);
        if (customerUser == null)
        {
            customerUser = new ApplicationUser
            {
                UserName = customerEmail,
                Email = customerEmail,
                FullName = "Sample Customer",
                EmailConfirmed = true,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };
            var result = await userManager.CreateAsync(customerUser, "Customer@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(customerUser, UserRoles.Customer);
            }
        }

        // Seed Shipper
        var shipperEmail = "shipper@velocity.com";
        var shipperUser = await userManager.FindByEmailAsync(shipperEmail);
        if (shipperUser == null)
        {
            shipperUser = new ApplicationUser
            {
                UserName = shipperEmail,
                Email = shipperEmail,
                FullName = "Sample Shipper",
                EmailConfirmed = true,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };
            var result = await userManager.CreateAsync(shipperUser, "Shipper@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(shipperUser, UserRoles.Shipper);
            }
        }
    }
}
