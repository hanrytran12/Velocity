using Domain.Constants;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Persistence;

public static class VelocityDataSeeder
{
    public static async Task SeedDataAsync(VelocityDbContext context)
    {
        if (await context.Products.AnyAsync())
        {
            return; // Already seeded
        }

        var products = new List<Product>
        {
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "Elevate Pro Runner",
                Description = "High-performance running shoe with maximum cushioning and breathability.",
                Brand = "Elevate",
                BasePrice = 120.00m,
                AverageRating = 4.5,
                Variants = new List<ProductVariant>
                {
                    new ProductVariant { Id = Guid.NewGuid(), Size = "42", Color = "Midnight Black", StockQuantity = 50, SKU = "ELV-PR-BLK-42" },
                    new ProductVariant { Id = Guid.NewGuid(), Size = "43", Color = "Midnight Black", StockQuantity = 40, SKU = "ELV-PR-BLK-43" },
                    new ProductVariant { Id = Guid.NewGuid(), Size = "42", Color = "Cloud White", StockQuantity = 30, SKU = "ELV-PR-WHT-42" }
                }
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "Urban Glide Sneaker",
                Description = "Sleek and versatile sneaker perfect for daily commutes and urban adventures.",
                Brand = "Urban",
                BasePrice = 85.00m,
                AverageRating = 4.2,
                Variants = new List<ProductVariant>
                {
                    new ProductVariant { Id = Guid.NewGuid(), Size = "40", Color = "Charcoal Grey", StockQuantity = 25, SKU = "URB-GL-GRY-40" },
                    new ProductVariant { Id = Guid.NewGuid(), Size = "41", Color = "Charcoal Grey", StockQuantity = 35, SKU = "URB-GL-GRY-41" },
                    new ProductVariant { Id = Guid.NewGuid(), Size = "40", Color = "Navy Blue", StockQuantity = 20, SKU = "URB-GL-BLU-40" }
                }
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "Apex Trail Blaster",
                Description = "Rugged trail running shoe designed for grip and stability on uneven terrain.",
                Brand = "Apex",
                BasePrice = 145.00m,
                AverageRating = 4.8,
                Variants = new List<ProductVariant>
                {
                    new ProductVariant { Id = Guid.NewGuid(), Size = "44", Color = "Forest Green", StockQuantity = 15, SKU = "APX-TB-GRN-44" },
                    new ProductVariant { Id = Guid.NewGuid(), Size = "45", Color = "Forest Green", StockQuantity = 10, SKU = "APX-TB-GRN-45" }
                }
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "Stellar Court High-Top",
                Description = "Classic high-top design with premium leather and iconic styling.",
                Brand = "Stellar",
                BasePrice = 110.00m,
                AverageRating = 4.6,
                Variants = new List<ProductVariant>
                {
                    new ProductVariant { Id = Guid.NewGuid(), Size = "42", Color = "Classic Red", StockQuantity = 12, SKU = "STL-HT-RED-42" },
                    new ProductVariant { Id = Guid.NewGuid(), Size = "43", Color = "Classic Red", StockQuantity = 18, SKU = "STL-HT-RED-43" }
                }
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "Cloud Walkers 2.0",
                Description = "Ulta-lightweight walking shoes that feel like walking on air.",
                Brand = "Elevate",
                BasePrice = 75.00m,
                AverageRating = 4.4,
                Variants = new List<ProductVariant>
                {
                    new ProductVariant { Id = Guid.NewGuid(), Size = "38", Color = "Soft Pink", StockQuantity = 25, SKU = "ELV-CW-PNK-38" },
                    new ProductVariant { Id = Guid.NewGuid(), Size = "39", Color = "Soft Pink", StockQuantity = 30, SKU = "ELV-CW-PNK-39" }
                }
            }
        };

        await context.Products.AddRangeAsync(products);
        await context.SaveChangesAsync();
    }
}
