using Domain.Enums;

namespace Domain.Entities;

public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public decimal BasePrice { get; set; }
    public double AverageRating { get; set; }
    
    public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
}
