using Application.Features.Orders.Commands.Checkout;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
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
        // TODO: Get CustomerId from authenticated user.
        // For now, we take it from the request or use a default one for testing.
        var customerId = request.CustomerId; 

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
