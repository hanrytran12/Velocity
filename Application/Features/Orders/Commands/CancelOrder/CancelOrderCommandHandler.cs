using Application.Common.Models;
using Application.Interfaces;
using Domain.Constants;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Orders.Commands.CancelOrder;

public class CancelOrderCommandHandler : IRequestHandler<CancelOrderCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IIdentityService _identityService;

    public CancelOrderCommandHandler(IUnitOfWork unitOfWork, IIdentityService identityService)
    {
        _unitOfWork = unitOfWork;
        _identityService = identityService;
    }

    public async Task<Result> Handle(CancelOrderCommand request, CancellationToken cancellationToken)
    {
        var orderRepo = _unitOfWork.Repository<Order>();
        var order = await orderRepo.Query()
            .Include(o => o.Items)
            .ThenInclude(i => i.ProductVariant)
            .Include(o => o.Payment)
            .FirstOrDefaultAsync(o => o.Id == request.OrderId, cancellationToken);

        if (order == null)
            return Result.Failure("Order not found.");

        var isAdmin = await _identityService.IsInRoleAsync(request.UserId, UserRoles.Admin);
        if (order.CustomerId != request.UserId && !isAdmin)
            return Result.Failure("Unauthorized access to this order.");

        if (order.Status is not (OrderStatus.Pending or OrderStatus.Processing))
            return Result.Failure($"Order cannot be cancelled. Current status: {order.Status}");

        // Cancel order
        order.Status = OrderStatus.Cancelled;
        order.CancelledAt = DateTime.UtcNow;

        // Note: Reason could be saved to an AdminNote or a new CancelReason field if existed, 
        // but for now we execute the cancellation effect without persisting the direct reason string.

        // Refund payment if already Paid (e.g., VNPay)
        if (order.Payment != null && order.Payment.Status == PaymentStatus.Paid)
        {
            order.Payment.Status = PaymentStatus.Refunded;
            // A background job could pick this up later to trigger the actual VNPay refund API
        }

        // Restore Inventory
        var variantRepo = _unitOfWork.Repository<ProductVariant>();
        foreach (var item in order.Items)
        {
            if (item.ProductVariant != null)
            {
                item.ProductVariant.StockQuantity += item.Quantity;
                variantRepo.Update(item.ProductVariant);
            }
        }

        orderRepo.Update(order);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
