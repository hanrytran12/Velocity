namespace Domain.Entities;

public class ProductVariant
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }

    public string Size { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty; // display name
    public string? ColorHex { get; set; } // optional, used by FE swatches

    public int StockQuantity { get; set; }
    public string SKU { get; set; } = string.Empty;

    public Product? Product { get; set; }
}
