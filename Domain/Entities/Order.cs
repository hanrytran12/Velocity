using Domain.Enums;

namespace Domain.Entities;

public class Order
{
    public Guid Id { get; set; }
    public Guid CustomerId { get; set; }
    public OrderStatus Status { get; set; }
    public decimal TotalAmount { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public Guid? ShipperId { get; set; }
    public DateTime? ConfirmedAt { get; set; }
    public DateTime? ShippedAt { get; set; }
    public DateTime? DeliveredAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    
    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    public Payment? Payment { get; set; }
    public ReturnRequest? ReturnRequest { get; set; }
    public ApplicationUser? Customer { get; set; }
    public ApplicationUser? Shipper { get; set; }
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}
