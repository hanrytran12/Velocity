using Application.Common.Models;
using MediatR;

namespace Application.Features.Orders.Commands.DispatchOrder;

public record DispatchOrderCommand(Guid OrderId, Guid ShipperId) : IRequest<Result>;
