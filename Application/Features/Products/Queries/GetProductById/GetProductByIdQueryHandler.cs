using Application.Common.Models;
using Application.Features.Products.Models;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Products.Queries.GetProductById;

public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, Result<ProductDetailDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetProductByIdQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<ProductDetailDto>> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _unitOfWork.Repository<Product>()
            .Query()
            .Include(p => p.Images)
            .Include(p => p.Specs)
            .Include(p => p.Variants)
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (product == null)
        {
            return Result<ProductDetailDto>.Failure("Product not found.");
        }

        var reviews = await _unitOfWork.Repository<Review>()
            .Query()
            .Where(r => r.ProductId == request.Id)
            .CountAsync(cancellationToken);

        var images = product.Images
            .OrderByDescending(i => i.IsPrimary)
            .ThenBy(i => i.SortOrder)
            .Select(i => new ProductImageDto(i.Url, i.IsPrimary, i.SortOrder))
            .ToList();

        var specs = product.Specs
            .OrderBy(s => s.SortOrder)
            .Select(s => new ProductSpecDto(s.Label, s.Value, s.SortOrder))
            .ToList();

        var variants = product.Variants
            .OrderBy(v => v.Size)
            .ThenBy(v => v.Color)
            .Select(v => new ProductVariantDto(v.Id, v.Size, v.Color, v.ColorHex, v.StockQuantity, v.SKU))
            .ToList();

        var dto = new ProductDetailDto(
            Id: product.Id,
            Name: product.Name,
            Brand: product.Brand,
            Category: product.Category,
            Price: product.BasePrice,
            OldPrice: product.OldPrice,
            Badge: product.Badge,
            BadgeColor: product.BadgeColor,
            Description: product.Description,
            Details: product.Details,
            TechnologyContent: product.TechnologyContent,
            AverageRating: product.AverageRating,
            Reviews: reviews,
            Images: images,
            Specs: specs,
            Variants: variants);

        return Result<ProductDetailDto>.Success(dto);
    }
}
