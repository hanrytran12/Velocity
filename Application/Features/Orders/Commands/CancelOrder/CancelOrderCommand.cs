using Application.Common.Models;
using MediatR;

namespace Application.Features.Orders.Commands.CancelOrder;

public record CancelOrderCommand(Guid OrderId, Guid UserId, string Reason) : IRequest<Result>;

public record CancelOrderRequest(string Reason);
