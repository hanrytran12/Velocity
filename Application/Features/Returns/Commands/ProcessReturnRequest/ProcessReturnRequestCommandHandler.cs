using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Returns.Commands.ProcessReturnRequest;

public class ProcessReturnRequestCommandHandler : IRequestHandler<ProcessReturnRequestCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork;

    public ProcessReturnRequestCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(ProcessReturnRequestCommand request, CancellationToken cancellationToken)
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

        if (returnReq.Status != ReturnRequestStatus.PendingApproval)
            return Result.Failure($"Return request has already been processed. Current status: {returnReq.Status}");

        returnReq.AdminNote = request.AdminNote;

        if (request.IsApproved)
        {
            if (request.ShipperId == null)
                return Result.Failure("ShipperId is required when approving a return request.");
                
            // Step 1 of Return process: Admin approves the request and assigns a Shipper. 
            returnReq.Status = ReturnRequestStatus.Returning;
            returnReq.ShipperId = request.ShipperId;
        }
        else
        {
            returnReq.Status = ReturnRequestStatus.Rejected;
        }

        returnRepo.Update(returnReq);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
