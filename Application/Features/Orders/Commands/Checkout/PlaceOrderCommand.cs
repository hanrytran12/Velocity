using Application.Common.Models;
using Domain.Enums;
using MediatR;

namespace Application.Features.Orders.Commands.Checkout;


public record CheckoutResponse(Guid OrderId, string? PaymentUrl = null);

public record PlaceOrderCommand(
    Guid CustomerId,
    string ShippingAddress,
    PaymentMethod PaymentMethod,
    List<CheckoutItemRequest> Items) : IRequest<Result<CheckoutResponse>>;
