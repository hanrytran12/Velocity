using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Orders.Commands.Checkout;

public class PlaceOrderCommandHandler : IRequestHandler<PlaceOrderCommand, Result<CheckoutResponse>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly Application.Interfaces.IVNPayService _vnPayService;

    public PlaceOrderCommandHandler(IUnitOfWork unitOfWork, Application.Interfaces.IVNPayService vnPayService)
    {
        _unitOfWork = unitOfWork;
        _vnPayService = vnPayService;
    }

    public async Task<Result<CheckoutResponse>> Handle(PlaceOrderCommand request, CancellationToken cancellationToken)
    {
        if (request.Items == null || !request.Items.Any())
        {
            return Result<CheckoutResponse>.Failure("Order must contain at least one item.");
        }

        var variantIds = request.Items.Select(i => i.ProductVariantId).ToList();
        var variantRepo = _unitOfWork.Repository<ProductVariant>();

        // 1. Fetch all required variants in one go
        var variants = await variantRepo.Query()
            .Include(v => v.Product)
            .Where(v => variantIds.Contains(v.Id))
            .ToListAsync(cancellationToken);

        await _unitOfWork.BeginTransactionAsync(cancellationToken);
        try
        {
            var orderId = Guid.NewGuid();
            decimal totalAmount = 0;
            var orderItems = new List<OrderItem>();

            foreach (var itemRequest in request.Items)
            {
                var variant = variants.FirstOrDefault(v => v.Id == itemRequest.ProductVariantId);

                if (variant == null)
                    return Result<CheckoutResponse>.Failure($"Product variant {itemRequest.ProductVariantId} not found.");

                if (variant.StockQuantity < itemRequest.Quantity)
                    return Result<CheckoutResponse>.Failure($"Insufficient stock for {variant.Product?.Name}. Available: {variant.StockQuantity}");

                // 2. Update Stock (EF Core will track this change automatically)
                variant.StockQuantity -= itemRequest.Quantity;

                var unitPrice = variant.Product?.BasePrice ?? 0;
                orderItems.Add(new OrderItem
                {
                    Id = Guid.NewGuid(),
                    OrderId = orderId,
                    ProductVariantId = variant.Id,
                    Quantity = itemRequest.Quantity,
                    UnitPrice = unitPrice
                });

                totalAmount += unitPrice * itemRequest.Quantity;
            }

            var order = new Order
            {
                Id = orderId,
                CustomerId = request.CustomerId,
                Status = OrderStatus.Pending,
                TotalAmount = totalAmount,
                ShippingAddress = request.ShippingAddress,
                CreatedAt = DateTime.UtcNow,
                Items = orderItems
            };

            var payment = new Payment
            {
                Id = Guid.NewGuid(),
                OrderId = orderId,
                Status = PaymentStatus.Unpaid,
                Method = request.PaymentMethod,
                Amount = totalAmount
            };

            await _unitOfWork.Repository<Order>().AddAsync(order);
            await _unitOfWork.Repository<Payment>().AddAsync(payment);

            // 3. Persistence
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            await _unitOfWork.CommitTransactionAsync(cancellationToken);
    
            string? paymentUrl = null;
            if (request.PaymentMethod == PaymentMethod.Online)
            {
                paymentUrl = _vnPayService.CreatePaymentUrl(orderId, totalAmount, "https://localhost:5001/api/payments/vnpay-return");
            }

            return Result<CheckoutResponse>.Success(new CheckoutResponse(orderId, paymentUrl));
        }
        catch (Exception ex)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            return Result<CheckoutResponse>.Failure($"Checkout failed: {ex.Message}");
        }
    }
}
