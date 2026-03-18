using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Orders.Commands.DeliverOrder;

public class DeliverOrderCommandHandler : IRequestHandler<DeliverOrderCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;

    public DeliverOrderCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(DeliverOrderCommand request, CancellationToken cancellationToken)
    {
        var orderRepo = _unitOfWork.Repository<Order>();
        var order = await orderRepo.Query()
            .Include(o => o.Payment)
            .FirstOrDefaultAsync(o => o.Id == request.OrderId, cancellationToken);

        if (order == null)
            return Result.Failure("Order not found.");

        if (order.Status != OrderStatus.Shipping)
            return Result.Failure($"Order cannot be delivered. Current status: {order.Status}");

        order.Status = OrderStatus.Delivered;
        order.DeliveredAt = DateTime.UtcNow;

        if (order.Payment != null && order.Payment.Method == PaymentMethod.COD)
        {
            order.Payment.Status = PaymentStatus.Paid;
            order.Payment.PaidAt = DateTime.UtcNow;
        }

        orderRepo.Update(order);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
