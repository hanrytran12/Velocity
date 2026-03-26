using Application.Features.Products.Queries.GetProductById;
using Application.Features.Products.Queries.GetProductReviews;
using Application.Features.Products.Queries.GetProducts;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts(
        [FromQuery] string? brand,
        [FromQuery] string? category,
        [FromQuery] string? size,
        [FromQuery] decimal? maxPrice,
        [FromQuery] string sortBy = "newest",
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 12)
    {
        var result = await _mediator.Send(new GetProductsQuery(
            Brand: brand,
            Category: category,
            Size: size,
            MaxPrice: maxPrice,
            SortBy: sortBy,
            PageNumber: pageNumber,
            PageSize: pageSize));

        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }

        if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound(result.Error);
        }

        return BadRequest(result.Error);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetProductById(Guid id)
    {
        var result = await _mediator.Send(new GetProductByIdQuery(id));

        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }

        if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound(result.Error);
        }

        return BadRequest(result.Error);
    }

    [HttpGet("{id:guid}/reviews")]
    public async Task<IActionResult> GetProductReviews(Guid id)
    {
        var result = await _mediator.Send(new GetProductReviewsQuery(id));

        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }

        if (result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound(result.Error);
        }

        return BadRequest(result.Error);
    }
}
