using Application.Common.Models;
using MediatR;

namespace Application.Features.Returns.Commands.ReceiveReturn;

public record ReceiveReturnCommand(
    Guid ReturnRequestId,
    bool ConditionOk,
    string? AdminNote) : IRequest<Result>;

public record ReceiveReturnRequestBody(
    bool ConditionOk,
    string? AdminNote);
