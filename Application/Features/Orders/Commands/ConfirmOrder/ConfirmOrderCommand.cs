using Application.Common.Models;
using MediatR;

namespace Application.Features.Orders.Commands.ConfirmOrder;

public record ConfirmOrderCommand(Guid OrderId) : IRequest<Result>;
