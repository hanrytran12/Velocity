using Application.Common.Models;
using Application.Features.Products.Models;
using MediatR;

namespace Application.Features.Products.Queries.GetProductReviews;

public record GetProductReviewsQuery(Guid ProductId) : IRequest<Result<IReadOnlyList<ProductReviewDto>>>;
