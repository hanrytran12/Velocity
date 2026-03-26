using Application.Common.Models;
using Application.Features.Products.Models;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Products.Queries.GetProductReviews;

public class GetProductReviewsQueryHandler : IRequestHandler<GetProductReviewsQuery, Result<IReadOnlyList<ProductReviewDto>>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetProductReviewsQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<IReadOnlyList<ProductReviewDto>>> Handle(GetProductReviewsQuery request, CancellationToken cancellationToken)
    {
        // Ensure product exists
        var exists = await _unitOfWork.Repository<Product>()
            .Query()
            .AsNoTracking()
            .AnyAsync(p => p.Id == request.ProductId, cancellationToken);

        if (!exists)
        {
            return Result<IReadOnlyList<ProductReviewDto>>.Failure("Product not found.");
        }

        var reviews = await _unitOfWork.Repository<Review>()
            .Query()
            .Where(r => r.ProductId == request.ProductId)
            .OrderByDescending(r => r.CreatedAt)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        if (reviews.Count == 0)
        {
            return Result<IReadOnlyList<ProductReviewDto>>.Success(Array.Empty<ProductReviewDto>());
        }

        var customerIds = reviews.Select(r => r.CustomerId).Distinct().ToList();

        var customers = await _unitOfWork.Repository<ApplicationUser>()
            .Query()
            .Where(u => customerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName, u.Email })
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var customerMap = customers.ToDictionary(
            x => x.Id,
            x => string.IsNullOrWhiteSpace(x.FullName) ? (x.Email ?? "Customer") : x.FullName);

        var dtos = reviews
            .Select(r => new ProductReviewDto(
                Id: r.Id,
                Rating: r.Rating,
                Comment: r.Comment,
                CreatedAt: r.CreatedAt,
                CustomerName: customerMap.TryGetValue(r.CustomerId, out var name) ? name : "Customer"))
            .ToList();

        return Result<IReadOnlyList<ProductReviewDto>>.Success(dtos);
    }
}
