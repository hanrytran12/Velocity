using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Returns.Commands.ConfirmReturnPickup;

public class ConfirmReturnPickupCommandHandler : IRequestHandler<ConfirmReturnPickupCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;

    public ConfirmReturnPickupCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(ConfirmReturnPickupCommand request, CancellationToken cancellationToken)
    {
        var returnRepo = _unitOfWork.Repository<ReturnRequest>();
        var returnReq = await returnRepo.Query()
            .FirstOrDefaultAsync(r => r.Id == request.ReturnRequestId, cancellationToken);

        if (returnReq == null)
            return Result.Failure("Return request not found.");

        if (returnReq.ShipperId != request.ShipperId)
            return Result.Failure("Unauthorized: You are not assigned to pick up this return request.");

        if (returnReq.Status != ReturnRequestStatus.Returning)
            return Result.Failure($"Cannot pick up items for a return request in status {returnReq.Status}.");

        returnReq.Status = ReturnRequestStatus.PickedUp;
        
        returnRepo.Update(returnReq);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
