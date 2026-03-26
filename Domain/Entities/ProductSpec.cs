namespace Domain.Entities;

public class ProductSpec
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }

    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;

    public int SortOrder { get; set; }

    public Product? Product { get; set; }
}
