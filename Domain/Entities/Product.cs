namespace Domain.Entities;

public class Product
{
    public Guid Id { get; set; }

    // Catalog
    public string Name { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; // e.g. "ROAD RUNNING", "TRAIL RUNNING"

    // Pricing
    public decimal BasePrice { get; set; }
    public decimal? OldPrice { get; set; }

    // Marketing / display
    public string? Badge { get; set; } // e.g. NEW / SALE / ELITE
    public string? BadgeColor { get; set; } // Tailwind color class or hex, depending on FE needs

    // Content
    public string Description { get; set; } = string.Empty; // short
    public string Details { get; set; } = string.Empty; // long
    public string TechnologyContent { get; set; } = string.Empty;

    public double AverageRating { get; set; }

    // Relations
    public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
    public ICollection<ProductSpec> Specs { get; set; } = new List<ProductSpec>();
    public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
}
