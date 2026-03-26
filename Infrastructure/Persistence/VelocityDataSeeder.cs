using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Infrastructure.Persistence;

public static class VelocityDataSeeder
{
    public static async Task SeedDataAsync(VelocityDbContext context)
    {
        // 1) Seed catalog if missing
        if (!await context.Products.AnyAsync())
        {
            var products = new List<Product>
            {
                CreateProduct(
                    name: "Adidas Supernova Glide M",
                    brand: "Adidas",
                    category: "ROAD RUNNING",
                    basePrice: "130.00",
                    description: "An incredibly versatile and durable daily trainer delivering a balanced and smooth ride.",
                    details: "The Adidas Supernova Glide M is engineered for runners seeking a perfect balance between comfort and responsiveness. The breathable engineered mesh upper adapts to your foot for a personalized fit, while the supportive heel counter locks you in. This shoe is built to handle your everyday miles with reliable durability and a consistent feel from step-in to cool down.",
                    technologyContent: "The midsole combines Adidas's premium cushioning technologies to provide exceptional shock absorption and energy return. It delivers a bouncy feel underfoot without sacrificing stability. The durable rubber outsole offers excellent traction on both wet and dry road surfaces, ensuring a confident stride in various conditions.",
                    rating: 4.7,
                    imagePath: "/images/products/SUPERNOVA GLIDE M.jpg",
                    specs: new[]
                    {
                        new { label = "Heel Drop", value = "10mm" },
                        new { label = "Weight", value = "295g" },
                        new { label = "Midsole", value = "Boost Layer" },
                        new { label = "Material", value = "Engineered Mesh" },
                    },
                    colors: new[]
                    {
                        new { name = "Core Black", hex = "#111111" },
                        new { name = "Cloud White", hex = "#FFFFFF" },
                    },
                    sizes: new[] { "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11" }
                ),

                CreateProduct(
                    name: "Adidas Terrex Agravic Speed Ultra",
                    brand: "Adidas",
                    category: "TRAIL RUNNING",
                    basePrice: "220.00",
                    description: "The ultimate race-day trail shoe built for speed over long distances with LIGHTSTRIKE PRO cushioning.",
                    details: "Built for speed on the trails, the Terrex Agravic Speed Ultra combines race-winning technologies with rugged outdoor durability. The upper is exceptionally breathable and features a snug, sock-like fit that keeps debris out. EnergyRods provide a propulsive feel, guiding you efficiently through every stride over unpredictable terrain.",
                    technologyContent: "The midsole features dual layers of LIGHTSTRIKE PRO foam for maximum energy return and shock absorption on long ultra races. Integrated EnergyRods limit energy loss at toe-off. The Continental™ Rubber outsole features an aggressive lug pattern optimized for confident grip on both wet and dry technical trails.",
                    rating: 4.8,
                    imagePath: "/images/products/Ultra Trail Terrex Agravic Speed.jpg",
                    specs: new[]
                    {
                        new { label = "Weight", value = "270g" },
                        new { label = "Drop", value = "8mm" },
                        new { label = "Midsole", value = "LIGHTSTRIKE PRO" },
                        new { label = "Outsole", value = "Continental™ Rubber" },
                    },
                    colors: new[]
                    {
                        new { name = "Impact Orange", hex = "#FF5E1F" },
                        new { name = "Core Black", hex = "#111111" },
                    },
                    sizes: new[] { "8", "8.5", "9", "9.5", "10", "10.5", "11" },
                    oldPrice: null,
                    badge: "ELITE",
                    badgeColor: "bg-[#111111]"
                ),

                CreateProduct(
                    name: "Adidas Adizero Prime X 2.0 STRUNG",
                    brand: "Adidas",
                    category: "TRACK & FIELD",
                    basePrice: "299.99",
                    description: "Rule-breaking distance running shoe with double carbon plates and max cushion LIGHTSTRIKE PRO.",
                    details: "Built without the constraints of world race regulations, the Adizero Prime X 2.0 STRUNG pushes the boundaries of speed. The innovative STRUNG upper is seamlessly coded to provide a lightweight cocoon around the foot, offering targeted support precisely where you need it. Designed for personal bests and training runs where you want to experience maximum propulsion.",
                    technologyContent: "This shoe features a massive stack height with three layers of LIGHTSTRIKE PRO foam for unparalleled cushioning and energy return. Between these layers sit two carbon-infused plates, creating a stiff, remarkably springy platform that maximizes forward momentum. The Continental™ Rubber outsole ensures reliable grip at high speeds.",
                    rating: 4.9,
                    imagePath: "/images/products/Adizero Prime X 2.0 STRUNG.jpg",
                    specs: new[]
                    {
                        new { label = "Weight", value = "295g" },
                        new { label = "Drop", value = "6.5mm" },
                        new { label = "Midsole", value = "3x LIGHTSTRIKE PRO" },
                        new { label = "Plates", value = "2x Carbon Plates" },
                    },
                    colors: new[]
                    {
                        new { name = "Lucid Lemon", hex = "#E8F04B" },
                        new { name = "Core Black", hex = "#111111" },
                    },
                    sizes: new[] { "8", "8.5", "9", "9.5", "10", "10.5", "11" },
                    oldPrice: null,
                    badge: "ELITE",
                    badgeColor: "bg-[#111111]"
                ),

                CreateProduct(
                    name: "Nike Air Zoom Pegasus 40",
                    brand: "Nike",
                    category: "ROAD RUNNING",
                    basePrice: "86.99",
                    description: "The trusted daily trainer with React foam and dual Zoom Air units for a springy, responsive ride.",
                    details: "The Pegasus 40 delivers familiar comfort with an upgraded midfoot feel, designed for everything from marathon training to casual runs. The single-layer mesh upper ensures breathability and support, while the larger heel counter provides a more comfortable landing and reduces impact on knees and hips. Flex grooves at the toe allow natural forward push-off for a smooth stride.",
                    technologyContent: "Nike React technology provides a lightweight, durable foam for a smooth and responsive ride that maintains its shape run after run. Combined with two Zoom Air units (one in the forefoot and one in the heel), it delivers an energized, springy feel at toe-off with superior impact protection. The classic waffle-inspired outsole provides reliable road traction.",
                    rating: 4.8,
                    imagePath: "/images/products/Nike Air Zoom Pegasus 40.jpg",
                    specs: new[]
                    {
                        new { label = "Weight", value = "262g" },
                        new { label = "Drop", value = "10mm" },
                        new { label = "Technology", value = "React + 2x Zoom Air" },
                    },
                    colors: new[]
                    {
                        new { name = "White/Chrome", hex = "#FFFFFF" },
                        new { name = "Phantom", hex = "#F5F5DC" },
                    },
                    sizes: new[] { "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9" },
                    oldPrice: "159.00",
                    badge: "SALE",
                    badgeColor: null
                ),

                CreateProduct(
                    name: "Nike Juniper Trail 2 NN",
                    brand: "Nike",
                    category: "TRAIL RUNNING",
                    basePrice: "67.99",
                    description: "Rugged trail-running shoe made with Nike Grind materials for a sustainable, grippy ride.",
                    details: "The Nike Juniper Trail 2 Next Nature is a rugged trail-running shoe designed for the female explorer. Built with a durable woven mesh upper and synthetic leather overlays, it ensures your feet stay protected from trail debris while maintaining breathability. The flexible midfoot system connects the upper and midsole for increased stability on uneven paths.",
                    technologyContent: "Featuring Nike Grind—a material recycled from manufacturing scraps—in the outsole, this shoe combines performance with sustainability. The tapered lugs and multi-directional traction pattern provide exceptional grip on both climbing and descending technical paths, while the full-length foam midsole absorbs impact.",
                    rating: 4.6,
                    imagePath: "https://sneakerdaily.vn/wp-content/uploads/2024/05/Giay-WMNS-Nike-Juniper-Trail-2-Next-Nature-Summit-White-Thunder-Blue-DM0821-103.jpg",
                    specs: new[]
                    {
                        new { label = "Weight", value = "225g" },
                        new { label = "Drop", value = "9.5mm" },
                        new { label = "Material", value = "Nike Grind / Mesh" },
                    },
                    colors: new[] { new { name = "Summit White", hex = "#F5F5DC" } },
                    sizes: new[] { "8", "8.5", "9", "9.5", "10", "10.5", "11" },
                    oldPrice: "85.00",
                    badge: "SALE",
                    badgeColor: null
                ),

                CreateProduct(
                    name: "Nike Dragonfly 2",
                    brand: "Nike",
                    category: "TRACK & FIELD",
                    basePrice: "143.99",
                    description: "The ultimate track spike for distance runners, featuring ZoomX foam and a carbon fiber plate.",
                    details: "Dominate the track with the Nike Dragonfly 2. Engineered for elite distance runners, this lightweight spike offers an unparalleled combination of speed and comfort. The engineered mesh upper is ultra-light and breathable, while the internal supports ensure a locked-in feel for every lap during 1500m to 10k races.",
                    technologyContent: "Combining a full-length ZoomX foam midsole—Nike's lightest and most responsive foam—with an integrated Carbon Fiber plate, the Dragonfly 2 delivers maximum energy return and snap. The redesigned spike plate provides aggressive traction on the track, allowing for a more efficient and powerful stride.",
                    rating: 5.0,
                    imagePath: "https://sneakerdaily.vn/wp-content/uploads/2025/04/Giay-Nike-Dragonfly-2-White-Black-Vapor-Green-Volt-FD8413-102.jpg",
                    specs: new[]
                    {
                        new { label = "Type", value = "Track Spike" },
                        new { label = "Midsole", value = "ZoomX Foam" },
                        new { label = "Plate", value = "Carbon Fiber" },
                    },
                    colors: new[] { new { name = "White/Volt", hex = "#FFFFFF" } },
                    sizes: new[] { "7.5", "8", "8.5", "9", "9.5", "10", "10.5" },
                    oldPrice: "179.00",
                    badge: "ELITE",
                    badgeColor: null
                ),

                CreateProduct(
                    name: "ASICS Gel-Nimbus 26",
                    brand: "ASICS",
                    category: "ROAD RUNNING",
                    basePrice: "171.99",
                    description: "Maximum cushioning and plush comfort for long-distance daily training.",
                    details: "The ASICS Gel-Nimbus 26 is a premium cushioned daily trainer designed for maximum comfort on long, easy runs. Featuring a soft engineered knit upper and an updated knit collar, it provides a plush, adaptive fit with superior ventilation to keep your feet cool across high mileage.",
                    technologyContent: "Equipped with PureGEL™ technology in the heel—65% softer than conventional gel—for smoother landings. The midsole features FF BLAST™ PLUS ECO cushioning, made with 24% bio-based content, delivering a lightweight and energized ride while reducing environmental impact.",
                    rating: 4.9,
                    imagePath: "/images/products/nimbus26.jpg",
                    specs: new[]
                    {
                        new { label = "Weight", value = "304g" },
                        new { label = "Drop", value = "8mm" },
                        new { label = "Technology", value = "PureGEL™" },
                        new { label = "Midsole", value = "FF BLAST™ PLUS ECO" },
                    },
                    colors: new[] { new { name = "Black/Graphite", hex = "#111111" } },
                    sizes: new[] { "8", "8.5", "9", "9.5", "10", "10.5", "11" }
                ),

                CreateProduct(
                    name: "ASICS Gel-Kayano 31",
                    brand: "ASICS",
                    category: "ROAD RUNNING",
                    basePrice: "171.99",
                    description: "Maximum stability with revolutionary 4D GUIDANCE SYSTEM™ for a smooth, supported stride.",
                    details: "The GEL-KAYANO™ 31 combines maximum support with outstanding comfort for absolute peace of mind. As our most advanced stability shoe, it is designed to help you run further for longer. With flexible stability and superior comfort, you'll wish the road would never end. The technical mesh upper enhances breathability, with 64% of the upper made from recycled materials.",
                    technologyContent: "The revolutionary 4D GUIDANCE SYSTEM™ includes four separate components supporting the foot at every landing, delivering maximum stability. PureGEL™ technology improves softness and shock absorption to reduce impact. FF BLAST™ PLUS ECO foam provides optimal comfort with an energized ride. The Hybrid ASICSGRIP™ outsole delivers enhanced grip and high durability, while the OrthoLite™ X-55 insole manages moisture for a cool, comfortable run.",
                    rating: 4.8,
                    imagePath: "/images/products/Gel-Kayano 31.jpg",
                    specs: new[]
                    {
                        new { label = "Weight", value = "275g" },
                        new { label = "Drop", value = "10mm" },
                        new { label = "Support", value = "4D GUIDANCE SYSTEM™" },
                        new { label = "Technology", value = "PureGEL™ + FF BLAST™ PLUS ECO" },
                    },
                    colors: new[]
                    {
                        new { name = "Pale Mint", hex = "#98D8C8" },
                        new { name = "Light Blue", hex = "#87CEEB" },
                    },
                    sizes: new[] { "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9" },
                    oldPrice: "185.00",
                    badge: "STABILITY",
                    badgeColor: null
                ),

                CreateProduct(
                    name: "ASICS Metaspeed Sky Paris",
                    brand: "ASICS",
                    category: "ROAD RUNNING",
                    basePrice: "259.99",
                    description: "Ultra-lightweight carbon-plated racer designed for maximum stride length.",
                    details: "Built for elite 'stride-style' runners, the Metaspeed Sky Paris is designed to increase speed by extending stride length. The ultra-lightweight MOTIONWRAP™ 2.0 upper provides a secure, zero-distraction fit, allowing you to focus entirely on the finish line of your next marathon.",
                    technologyContent: "The midsole features the revolutionary FF BLAST™ TURBO PLUS foam, providing explosive energy return and a softer underfoot feel. A strategically placed full-length carbon plate works with the high-stack foam to propel you forward with every kickoff, optimizing your most powerful strides.",
                    rating: 5.0,
                    imagePath: "/images/products/metaspeedskyparis.jpg",
                    specs: new[]
                    {
                        new { label = "Category", value = "Elite Racing" },
                        new { label = "Midsole", value = "FF BLAST™ TURBO PLUS" },
                        new { label = "Plate", value = "Carbon Fiber" },
                        new { label = "Upper", value = "MOTIONWRAP™ 2.0" },
                    },
                    colors: new[] { new { name = "Sunrise Red", hex = "#FF4500" } },
                    sizes: new[] { "8", "8.5", "9", "9.5", "10", "10.5" },
                    oldPrice: null,
                    badge: "ELITE",
                    badgeColor: "bg-[#FF5E1F]"
                ),

                CreateProduct(
                    name: "ASICS Trabuco Max 5",
                    brand: "ASICS",
                    category: "TRAIL RUNNING",
                    basePrice: "172.99",
                    description: "Advanced grip and cloud-like comfort for superior confidence on technical trail routes.",
                    details: "The TRABUCO MAX™ 5 trail shoe offers advanced grip and comfort to help you tackle trail routes with maximum confidence. ASICSGRIP™ technology is strategically placed in the outsole to enhance traction on off-road terrain. FF BLAST™ PLUS technology in the midsole provides cloud-like cushioning and responsive energy return for a smooth ride.",
                    technologyContent: "Featuring FF BLAST™ PLUS cushioning for exceptional impact absorption and GUIDESOLE™ technology to promote an efficient forward roll. The ASICSGRIP™ outsole rubber provides elite-level traction on rocky, wet, or muddy paths, giving you total confidence in every step.",
                    rating: 4.9,
                    imagePath: "/images/products/trabucomax5.jpg",
                    specs: new[]
                    {
                        new { label = "Tech", value = "GUIDESOLE™" },
                        new { label = "Outsole", value = "ASICSGRIP™" },
                        new { label = "Midsole", value = "FF BLAST™ PLUS" },
                        new { label = "Weight", value = "302g" },
                    },
                    colors: new[] { new { name = "Cobalt Burst", hex = "#4B5563" } },
                    sizes: new[] { "8", "8.5", "9", "9.5", "10", "11" },
                    oldPrice: "199.99",
                    badge: "TRAIL ELITE",
                    badgeColor: null
                ),

                CreateProduct(
                    name: "ASICS Metaspeed LD 2",
                    brand: "ASICS",
                    category: "TRACK & FIELD",
                    basePrice: "227.99",
                    description: "High-energy track spike designed for sustained performance in long-distance racing.",
                    details: "The Metaspeed LD 2 is the ultimate weapon for long-distance track events. Developed for 3,000m to 10,000m races, it features an optimized spike configuration and a MOTIONWRAP™ 2.0 upper for the lightest possible racing experience on the oval.",
                    technologyContent: "Utilizing full-length FF BLAST™ TURBO foam and an integrated carbon fiber plate, it delivers sustained energy return for every lap. This 'super-spike' is designed to maintain your pace and efficiency when fatigue sets in during the final stages of the race.",
                    rating: 4.9,
                    imagePath: "/images/products/metaspeedld2.jpg",
                    specs: new[]
                    {
                        new { label = "Weight", value = "159g" },
                        new { label = "Midsole", value = "FF BLAST™ TURBO" },
                        new { label = "Plate", value = "Carbon Fiber" },
                        new { label = "Events", value = "3k - 10k" },
                    },
                    colors: new[] { new { name = "Pink/Volt", hex = "#FF69B4" } },
                    sizes: new[] { "7.5", "8", "8.5", "9", "9.5", "10" },
                    oldPrice: null,
                    badge: "PRO",
                    badgeColor: null
                ),
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }

        // 2) Seed sample reviews (2-3 per product). If some already exist, only top-up.

        // Requires seeded identity user
        var customer = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == "customer@velocity.com");
        if (customer == null)
        {
            return;
        }

        var productsWithVariants = await context.Products
            .Include(p => p.Variants)
            .ToListAsync();

        if (productsWithVariants.Count == 0)
        {
            return;
        }

        var comments = new[]
        {
            "Rất êm và nhẹ, chạy đường dài ổn.",
            "Form đẹp, đi ôm chân, đáng tiền.",
            "Độ bám tốt, chạy trail tự tin hơn.",
            "Cảm giác phản hồi tốt, phù hợp tập luyện.",
            "Đúng kỳ vọng, sẽ mua lại lần sau."
        };

        // Determine which products still need more reviews.
        var existingCounts = await context.Reviews
            .GroupBy(r => r.ProductId)
            .Select(g => new { ProductId = g.Key, Count = g.Count() })
            .ToListAsync();

        var countMap = existingCounts.ToDictionary(x => x.ProductId, x => x.Count);

        var rng = new Random(20260326);
        var productsNeedingReviews = productsWithVariants
            .Where(p => (countMap.TryGetValue(p.Id, out var c) ? c : 0) < 2)
            .ToList();

        if (productsNeedingReviews.Count == 0)
        {
            return;
        }

        var orderId = Guid.NewGuid();
        var now = DateTime.UtcNow;

        var orderItems = new List<OrderItem>();
        decimal totalAmount = 0;

        foreach (var p in productsNeedingReviews)
        {
            var variant = p.Variants.OrderBy(v => v.Size).FirstOrDefault();
            if (variant == null)
            {
                continue;
            }

            orderItems.Add(new OrderItem
            {
                Id = Guid.NewGuid(),
                OrderId = orderId,
                ProductVariantId = variant.Id,
                Quantity = 1,
                UnitPrice = p.BasePrice
            });

            totalAmount += p.BasePrice;
        }

        var order = new Order
        {
            Id = orderId,
            CustomerId = customer.Id,
            Status = OrderStatus.Completed,
            TotalAmount = totalAmount,
            ShippingAddress = "Seed Address",
            CreatedAt = now,
            DeliveredAt = now,
            CompletedAt = now
        };

        var payment = new Payment
        {
            Id = Guid.NewGuid(),
            OrderId = orderId,
            Method = PaymentMethod.COD,
            Amount = totalAmount,
            Status = PaymentStatus.Paid,
            PaidAt = now
        };

        await context.Orders.AddAsync(order);
        await context.OrderItems.AddRangeAsync(orderItems);
        await context.Payments.AddAsync(payment);
        await context.SaveChangesAsync();

        var reviews = new List<Review>();

        foreach (var p in productsNeedingReviews)
        {
            var current = countMap.TryGetValue(p.Id, out var c) ? c : 0;
            var target = rng.Next(2, 4); // 2-3 desired
            var toAdd = Math.Max(0, target - current);

            for (var i = 0; i < toAdd; i++)
            {
                var rating = rng.Next(4, 6); // 4-5
                var comment = comments[rng.Next(0, comments.Length)];

                reviews.Add(new Review
                {
                    Id = Guid.NewGuid(),
                    CustomerId = customer.Id,
                    ProductId = p.Id,
                    OrderId = orderId,
                    Rating = rating,
                    Comment = comment,
                    CreatedAt = now.AddDays(-rng.Next(0, 21))
                });
            }
        }

        if (reviews.Count > 0)
        {
            await context.Reviews.AddRangeAsync(reviews);
            await context.SaveChangesAsync();
        }

        // Recompute AverageRating from reviews
        var avgMap = await context.Reviews
            .GroupBy(r => r.ProductId)
            .Select(g => new { ProductId = g.Key, Avg = g.Average(x => x.Rating) })
            .ToListAsync();

        foreach (var row in avgMap)
        {
            var prod = productsWithVariants.FirstOrDefault(p => p.Id == row.ProductId);
            if (prod != null)
            {
                prod.AverageRating = Math.Round(row.Avg, 1);
            }
        }

        context.Products.UpdateRange(productsWithVariants);
        await context.SaveChangesAsync();
    }

    private static Product CreateProduct(
        string name,
        string brand,
        string category,
        string basePrice,
        string description,
        string details,
        string technologyContent,
        double rating,
        string imagePath,
        dynamic[] specs,
        dynamic[] colors,
        string[] sizes,
        string? oldPrice = null,
        string? badge = null,
        string? badgeColor = null)
    {
        var productId = Guid.NewGuid();
        var product = new Product
        {
            Id = productId,
            Name = name,
            Brand = brand,
            Category = category,
            BasePrice = decimal.Parse(basePrice),
            OldPrice = string.IsNullOrEmpty(oldPrice) ? null : decimal.Parse(oldPrice),
            Badge = badge,
            BadgeColor = badgeColor,
            Description = description,
            Details = details,
            TechnologyContent = technologyContent,
            AverageRating = rating,
            Images = new List<ProductImage>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    ProductId = productId,
                    Url = imagePath,
                    IsPrimary = true,
                    SortOrder = 0
                }
            },
            Specs = new List<ProductSpec>(),
            Variants = new List<ProductVariant>()
        };

        // Specs
        var specOrder = 0;
        foreach (var spec in specs)
        {
            product.Specs.Add(new ProductSpec
            {
                Id = Guid.NewGuid(),
                ProductId = productId,
                Label = spec.label,
                Value = spec.value,
                SortOrder = specOrder++
            });
        }

        // Variants = cartesian product colors x sizes
        foreach (var color in colors)
        {
            foreach (var size in sizes)
            {
                var sku = GenerateSku(brand, name, (string)color.name, size);
                product.Variants.Add(new ProductVariant
                {
                    Id = Guid.NewGuid(),
                    ProductId = productId,
                    Size = size,
                    Color = color.name,
                    ColorHex = color.hex,
                    StockQuantity = 25,
                    SKU = sku
                });
            }
        }

        return product;
    }

    private static string GenerateSku(string brand, string productName, string color, string size)
    {
        var brandShort = NormalizeSku(brand.Length >= 3 ? brand[..3] : brand);

        var words = productName.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var shortName = words.Length >= 2
            ? string.Concat(words.Skip(1).Take(2).Select(w => w.Length >= 2 ? w[..2] : w))
            : (productName.Length >= 2 ? productName[..2] : productName);
        shortName = NormalizeSku(shortName);

        var colorShort = NormalizeSku(color);
        var sizeShort = NormalizeSku(size);

        return $"{brandShort}-{shortName}-{colorShort}-{sizeShort}";
    }

    private static string NormalizeSku(string text)
    {
        // Uppercase, keep only alphanumeric and hyphens
        var normalized = Regex.Replace(text, @"[^a-zA-Z0-9\-]", "").ToUpperInvariant();
        // Collapse multiple hyphens
        normalized = Regex.Replace(normalized, @"\-+", "-");
        return normalized;
    }
}
