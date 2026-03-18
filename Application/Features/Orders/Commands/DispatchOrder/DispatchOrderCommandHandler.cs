using Application.Common.Models;
using Application.Interfaces;
using Domain.Constants;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;

namespace Application.Features.Orders.Commands.DispatchOrder;

public class DispatchOrderCommandHandler : IRequestHandler<DispatchOrderCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IIdentityService _identityService;

    public DispatchOrderCommandHandler(IUnitOfWork unitOfWork, IIdentityService identityService)
    {
        _unitOfWork = unitOfWork;
        _identityService = identityService;
    }

    public async Task<Result> Handle(DispatchOrderCommand request, CancellationToken cancellationToken)
    {
        var orderRepo = _unitOfWork.Repository<Order>();
        var order = await orderRepo.GetByIdAsync(request.OrderId);

        if (order == null)
            return Result.Failure("Order not found.");

        if (order.Status != OrderStatus.Processing)
            return Result.Failure($"Order cannot be dispatched. Current status: {order.Status}");

        // Validate Shipper
        var isShipper = await _identityService.IsInRoleAsync(request.ShipperId, UserRoles.Shipper);
        if (!isShipper)
            return Result.Failure("Invalid Shipper ID.");

        order.Status = OrderStatus.Shipping;
        order.ShipperId = request.ShipperId;
        order.ShippedAt = DateTime.UtcNow;

        orderRepo.Update(order);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
