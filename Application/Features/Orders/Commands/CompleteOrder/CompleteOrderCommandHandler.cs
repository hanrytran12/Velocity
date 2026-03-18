using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;

namespace Application.Features.Orders.Commands.CompleteOrder;

public class CompleteOrderCommandHandler : IRequestHandler<CompleteOrderCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;

    public CompleteOrderCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(CompleteOrderCommand request, CancellationToken cancellationToken)
    {
        var orderRepo = _unitOfWork.Repository<Order>();
        var order = await orderRepo.GetByIdAsync(request.OrderId);

        if (order == null)
            return Result.Failure("Order not found.");

        if (order.CustomerId != request.CustomerId)
            return Result.Failure("Unauthorized access to this order.");

        if (order.Status != OrderStatus.Delivered)
            return Result.Failure($"Order cannot be completed. Current status: {order.Status}");

        order.Status = OrderStatus.Completed;
        order.CompletedAt = DateTime.UtcNow;

        orderRepo.Update(order);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
