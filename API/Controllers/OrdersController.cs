using Application.Features.Orders.Commands.AddReview;
using Application.Features.Orders.Commands.Checkout;
using Application.Features.Orders.Commands.CompleteOrder;
using Application.Features.Orders.Commands.ConfirmOrder;
using Application.Features.Orders.Commands.DeliverOrder;
using Application.Features.Orders.Commands.DispatchOrder;
using Domain.Constants;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
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

    [HttpPut("{orderId}/confirm")]
    [Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> ConfirmOrder(Guid orderId)
    {
        var result = await _mediator.Send(new ConfirmOrderCommand(orderId));
        return result.IsSuccess ? Ok("Order confirmed.") : BadRequest(result.Error);
    }

    [HttpPut("{orderId}/dispatch")]
    [Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> DispatchOrder(Guid orderId, [FromBody] DispatchRequest request)
    {
        var result = await _mediator.Send(new DispatchOrderCommand(orderId, request.ShipperId));
        return result.IsSuccess ? Ok("Order dispatched to shipper.") : BadRequest(result.Error);
    }

    [HttpPut("{orderId}/deliver")]
    [Authorize(Roles = UserRoles.Shipper)]
    public async Task<IActionResult> DeliverOrder(Guid orderId)
    {
        var result = await _mediator.Send(new DeliverOrderCommand(orderId));
        return result.IsSuccess ? Ok("Order delivered successfully.") : BadRequest(result.Error);
    }

    [HttpPut("{orderId}/complete")]
    [Authorize(Roles = UserRoles.Customer)]
    public async Task<IActionResult> CompleteOrder(Guid orderId)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
                          ?? User.FindFirst("sub")?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("User ID not found in token.");

        var customerId = Guid.Parse(userIdClaim);
        var result = await _mediator.Send(new CompleteOrderCommand(orderId, customerId));
        
        return result.IsSuccess ? Ok("Order completed successfully.") : BadRequest(result.Error);
    }

    [HttpPost("{orderId}/reviews")]
    [Authorize(Roles = UserRoles.Customer)]
    public async Task<IActionResult> AddReview(Guid orderId, [FromBody] AddReviewRequest request)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
                          ?? User.FindFirst("sub")?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("User ID not found in token.");

        var customerId = Guid.Parse(userIdClaim);
        var command = new AddReviewCommand(customerId, orderId, request.ProductId, request.Rating, request.Comment);
        var result = await _mediator.Send(command);

        return result.IsSuccess ? Ok("Review submitted successfully.") : BadRequest(result.Error);
    }
}
