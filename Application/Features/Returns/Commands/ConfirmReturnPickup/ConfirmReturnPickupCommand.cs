using Application.Common.Models;
using MediatR;

namespace Application.Features.Returns.Commands.ConfirmReturnPickup;

public record ConfirmReturnPickupCommand(Guid ReturnRequestId, Guid ShipperId) : IRequest<Result>;
