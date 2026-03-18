using Application.Common.Models;
using MediatR;

namespace Application.Features.Returns.Commands.ProcessReturnRequest;

public record ProcessReturnRequestCommand(
    Guid ReturnRequestId,
    bool IsApproved,
    string? AdminNote,
    Guid? ShipperId = null) : IRequest<Result>;

public record ProcessReturnRequestBody(
    bool IsApproved,
    string? AdminNote,
    Guid? ShipperId = null);
