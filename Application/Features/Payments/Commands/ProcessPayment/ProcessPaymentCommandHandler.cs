using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Payments.Commands.ProcessPayment;

public class ProcessPaymentCommandHandler : IRequestHandler<ProcessPaymentCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;

    public ProcessPaymentCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(ProcessPaymentCommand request, CancellationToken cancellationToken)
    {
        var orderRepo = _unitOfWork.Repository<Order>();
        var variantRepo = _unitOfWork.Repository<ProductVariant>();

        var order = await orderRepo.Query()
            .Include(o => o.Items)
            .Include(o => o.Payment)
            .FirstOrDefaultAsync(o => o.Id == request.OrderId, cancellationToken);

        if (order == null || order.Payment == null)
            return Result.Failure("Order or Payment record not found.");

        if (request.IsSuccess)
        {
            order.Payment.Status = PaymentStatus.Paid;
            order.Payment.TransactionId = request.TransactionId;
            order.Payment.PaidAt = DateTime.UtcNow;
        }
        else
        {
            order.Payment.Status = PaymentStatus.Failed;
            order.Status = OrderStatus.Cancelled;

            // Restore Inventory
            foreach (var item in order.Items)
            {
                var variant = await variantRepo.GetByIdAsync(item.ProductVariantId);
                if (variant != null)
                {
                    variant.StockQuantity += item.Quantity;
                    variantRepo.Update(variant);
                }
            }
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
