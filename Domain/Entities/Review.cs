namespace Domain.Entities;

public class Review
{
    public Guid Id { get; set; }
    public Guid CustomerId { get; set; }
    public Guid ProductId { get; set; }
    public Guid OrderId { get; set; } // Verified Purchase
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    
    public Product? Product { get; set; }
    public Order? Order { get; set; }
    public ApplicationUser? Customer { get; set; }
}
