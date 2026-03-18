using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Returns.Commands.ReceiveReturn;

public class ReceiveReturnCommandHandler : IRequestHandler<ReceiveReturnCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;

    public ReceiveReturnCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(ReceiveReturnCommand request, CancellationToken cancellationToken)
    {
        var returnRepo = _unitOfWork.Repository<ReturnRequest>();
        var returnReq = await returnRepo.Query()
            .Include(r => r.Order)
                .ThenInclude(o => o.Items)
                .ThenInclude(i => i.ProductVariant)
            .Include(r => r.Order)
                .ThenInclude(o => o.Payment)
            .FirstOrDefaultAsync(r => r.Id == request.ReturnRequestId, cancellationToken);

        if (returnReq == null)
            return Result.Failure("Return request not found.");

        if (returnReq.Status != ReturnRequestStatus.PickedUp)
            return Result.Failure($"Cannot receive items for a return request in status {returnReq.Status}. The items must be PickedUp first.");

        if (!string.IsNullOrEmpty(request.AdminNote))
        {
            returnReq.AdminNote = request.AdminNote;
        }

        if (request.ConditionOk)
        {
            returnReq.Status = ReturnRequestStatus.Resolved;
            
            if (returnReq.Order != null)
            {
                returnReq.Order.Status = OrderStatus.Returned;
                returnReq.Order.ReturnedAt = DateTime.UtcNow;

                // Process Mock Refund
                if (returnReq.Order.Payment != null && returnReq.Order.Payment.Status == PaymentStatus.Paid)
                {
                    returnReq.Order.Payment.Status = PaymentStatus.Refunded;
                }

                // Restore Inventory
                var variantRepo = _unitOfWork.Repository<ProductVariant>();
                foreach (var item in returnReq.Order.Items)
                {
                    if (item.ProductVariant != null)
                    {
                        item.ProductVariant.StockQuantity += item.Quantity;
                        variantRepo.Update(item.ProductVariant);
                    }
                }
                
                var orderRepo = _unitOfWork.Repository<Order>();
                orderRepo.Update(returnReq.Order);
            }
        }
        else
        {
            // If condition is not OK, depending on policy it might be rejected or partially refunded.
            // For now, we will reject the return request.
            returnReq.Status = ReturnRequestStatus.Rejected;
        }

        returnRepo.Update(returnReq);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
