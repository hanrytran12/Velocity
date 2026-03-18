using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Returns.Commands.CreateReturnRequest;

public class CreateReturnRequestCommandHandler : IRequestHandler<CreateReturnRequestCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;

    public CreateReturnRequestCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(CreateReturnRequestCommand request, CancellationToken cancellationToken)
    {
        var orderRepo = _unitOfWork.Repository<Order>();
        var order = await orderRepo.GetByIdAsync(request.OrderId);

        if (order == null)
            return Result.Failure("Order not found.");

        if (order.CustomerId != request.CustomerId)
            return Result.Failure("Unauthorized access to this order.");

        if (order.Status != OrderStatus.Delivered)
            return Result.Failure($"Return request cannot be created for an order with status {order.Status}. It must be Delivered.");

        if (order.DeliveredAt.HasValue && DateTime.UtcNow > order.DeliveredAt.Value.AddDays(7))
        {
            // Lazy Evaluation: If it's been > 7 days, auto-complete it here in case the background job hasn't run yet.
            order.Status = OrderStatus.Completed;
            order.CompletedAt = DateTime.UtcNow;
            orderRepo.Update(order);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            
            return Result.Failure("The return period of 7 days has expired. The order has been automatically marked as Completed.");
        }

        var returnRepo = _unitOfWork.Repository<ReturnRequest>();
        
        var requestExists = await returnRepo.Query()
            .AnyAsync(r => r.OrderId == request.OrderId, cancellationToken);
            
        if (requestExists)
            return Result.Failure("A return request already exists for this order.");

        var returnReq = new ReturnRequest
        {
            Id = Guid.NewGuid(),
            OrderId = request.OrderId,
            Status = ReturnRequestStatus.PendingApproval,
            Reason = request.Reason,
            EvidenceUrls = request.EvidenceUrls ?? new List<string>(),
            RequestedAt = DateTime.UtcNow
        };

        await returnRepo.AddAsync(returnReq);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
