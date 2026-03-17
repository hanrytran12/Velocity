using Application.Common.Models;
using MediatR;

namespace Application.Features.Payments.Commands.ProcessPayment;

public record ProcessPaymentCommand(
    Guid OrderId,
    bool IsSuccess,
    string TransactionId) : IRequest<Result>;
