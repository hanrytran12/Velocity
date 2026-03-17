using Domain.Enums;

namespace Application.Features.Orders.Commands.Checkout;

public class CheckoutRequest
{
    public Guid CustomerId { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public PaymentMethod PaymentMethod { get; set; }
    public List<CheckoutItemRequest> Items { get; set; } = new();
}

public record CheckoutItemRequest(Guid ProductVariantId, int Quantity);
