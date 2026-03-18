using Application.Common.Models;
using MediatR;

namespace Application.Features.Orders.Commands.CompleteOrder;

public record CompleteOrderCommand(Guid OrderId, Guid CustomerId) : IRequest<Result>;
