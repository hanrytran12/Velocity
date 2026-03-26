using Application.Common.Models;
using Application.Features.Products.Models;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Products.Queries.GetProducts;

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, Result<PaginatedResponse<ProductListDto>>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetProductsQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<PaginatedResponse<ProductListDto>>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        var productQuery = _unitOfWork.Repository<Product>()
            .Query()
            .Include(p => p.Images)
            .Include(p => p.Variants)
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.Brand))
        {
            productQuery = productQuery.Where(p => p.Brand == request.Brand);
        }

        if (!string.IsNullOrWhiteSpace(request.Category))
        {
            productQuery = productQuery.Where(p => p.Category == request.Category);
        }

        if (!string.IsNullOrWhiteSpace(request.Size))
        {
            productQuery = productQuery.Where(p => p.Variants.Any(v => v.Size == request.Size));
        }

        if (request.MaxPrice.HasValue)
        {
            productQuery = productQuery.Where(p => p.BasePrice <= request.MaxPrice.Value);
        }

        productQuery = request.SortBy?.ToLowerInvariant() switch
        {
            "price_asc" => productQuery.OrderBy(p => p.BasePrice).ThenBy(p => p.Name),
            "price_desc" => productQuery.OrderByDescending(p => p.BasePrice).ThenBy(p => p.Name),
            _ => productQuery.OrderByDescending(p => p.Id) // "newest" fallback
        };

        var totalCount = await productQuery.CountAsync(cancellationToken);

        var pageNumber = request.PageNumber <= 0 ? 1 : request.PageNumber;
        var pageSize = request.PageSize is <= 0 or > 100 ? 12 : request.PageSize;

        var products = await productQuery
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        var productIds = products.Select(p => p.Id).ToList();

        var reviewCounts = await _unitOfWork.Repository<Review>()
            .Query()
            .Where(r => productIds.Contains(r.ProductId))
            .GroupBy(r => r.ProductId)
            .Select(g => new { ProductId = g.Key, Count = g.Count() })
            .ToListAsync(cancellationToken);

        var reviewCountMap = reviewCounts.ToDictionary(x => x.ProductId, x => x.Count);

        var items = products.Select(p =>
        {
            var image = p.Images
                .OrderByDescending(i => i.IsPrimary)
                .ThenBy(i => i.SortOrder)
                .Select(i => i.Url)
                .FirstOrDefault() ?? string.Empty;

            var reviews = reviewCountMap.TryGetValue(p.Id, out var c) ? c : 0;

            return new ProductListDto(
                Id: p.Id,
                Name: p.Name,
                Brand: p.Brand,
                Category: p.Category,
                Price: p.BasePrice,
                OldPrice: p.OldPrice,
                Badge: p.Badge,
                BadgeColor: p.BadgeColor,
                Image: image,
                AverageRating: p.AverageRating,
                Reviews: reviews);
        }).ToList();

        return Result<PaginatedResponse<ProductListDto>>.Success(
            new PaginatedResponse<ProductListDto>(items, totalCount, pageNumber, pageSize));
    }
}
