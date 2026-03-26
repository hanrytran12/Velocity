using Application.Common.Models;
using Application.Features.Products.Models;
using MediatR;

namespace Application.Features.Products.Queries.GetProductById;

public record GetProductByIdQuery(Guid Id) : IRequest<Result<ProductDetailDto>>;
