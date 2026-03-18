using Application.Features.Orders.Commands.Checkout;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Microsoft.AspNetCore.Authorization.Authorize]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout([FromBody] CheckoutRequest request)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value 
                          ?? User.FindFirst("sub")?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
        {
            return Unauthorized("User ID not found in token.");
        }

        var customerId = Guid.Parse(userIdClaim);

        var command = new PlaceOrderCommand(
            customerId,
            request.ShippingAddress,
            request.PaymentMethod,
            request.Items);

        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return Ok(new 
            { 
                OrderId = result.Value?.OrderId, 
                PaymentUrl = result.Value?.PaymentUrl 
            });
        }

        return BadRequest(result.Error);
    }
}
