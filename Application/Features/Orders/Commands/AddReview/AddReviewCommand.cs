using Application.Common.Models;
using MediatR;

namespace Application.Features.Orders.Commands.AddReview;

public record AddReviewCommand(
    Guid CustomerId,
    Guid OrderId,
    Guid ProductId,
    int Rating,
    string Comment) : IRequest<Result>;
    
public record AddReviewRequest(
    Guid ProductId,
    int Rating,
    string Comment);
