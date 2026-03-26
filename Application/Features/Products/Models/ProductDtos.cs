namespace Application.Features.Products.Models;

public record ProductListDto(
    Guid Id,
    string Name,
    string Brand,
    string Category,
    decimal Price,
    decimal? OldPrice,
    string? Badge,
    string? BadgeColor,
    string Image,
    double AverageRating,
    int Reviews);

public record ProductDetailDto(
    Guid Id,
    string Name,
    string Brand,
    string Category,
    decimal Price,
    decimal? OldPrice,
    string? Badge,
    string? BadgeColor,
    string Description,
    string Details,
    string TechnologyContent,
    double AverageRating,
    int Reviews,
    IReadOnlyList<ProductImageDto> Images,
    IReadOnlyList<ProductSpecDto> Specs,
    IReadOnlyList<ProductVariantDto> Variants);

public record ProductImageDto(string Url, bool IsPrimary, int SortOrder);

public record ProductSpecDto(string Label, string Value, int SortOrder);

public record ProductVariantDto(
    Guid Id,
    string Size,
    string Color,
    string? ColorHex,
    int StockQuantity,
    string SKU);

public record PaginatedResponse<T>(
    IReadOnlyList<T> Items,
    int TotalCount,
    int PageNumber,
    int PageSize);
