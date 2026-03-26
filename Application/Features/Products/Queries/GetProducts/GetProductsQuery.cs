using Application.Common.Models;
using Application.Features.Products.Models;
using MediatR;

namespace Application.Features.Products.Queries.GetProducts;

public record GetProductsQuery(
    string? Brand = null,
    string? Category = null,
    string? Size = null,
    decimal? MaxPrice = null,
    string SortBy = "newest",
    int PageNumber = 1,
    int PageSize = 12
) : IRequest<Result<PaginatedResponse<ProductListDto>>>;
