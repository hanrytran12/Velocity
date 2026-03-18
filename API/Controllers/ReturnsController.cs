using Application.Features.Returns.Commands.ConfirmReturnPickup;
using Application.Features.Returns.Commands.CreateReturnRequest;
using Application.Features.Returns.Commands.ProcessReturnRequest;
using Application.Features.Returns.Commands.ReceiveReturn;
using Domain.Constants;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReturnsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ReturnsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("{orderId}")]
    [Authorize(Roles = UserRoles.Customer)]
    public async Task<IActionResult> CreateReturnRequest(Guid orderId, [FromBody] CreateReturnRequestBody request)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
                          ?? User.FindFirst("sub")?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("User ID not found in token.");

        var customerId = Guid.Parse(userIdClaim);
        var command = new CreateReturnRequestCommand(customerId, orderId, request.Reason, request.EvidenceUrls);
        var result = await _mediator.Send(command);

        return result.IsSuccess ? Ok("Return request created successfully.") : BadRequest(result.Error);
    }

    [HttpPut("{returnRequestId}/process")]
    [Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> ProcessReturnRequest(Guid returnRequestId, [FromBody] ProcessReturnRequestBody request)
    {
        var command = new ProcessReturnRequestCommand(returnRequestId, request.IsApproved, request.AdminNote, request.ShipperId);
        var result = await _mediator.Send(command);

        return result.IsSuccess ? Ok("Return request processed successfully. Waiting for items to be returned.") : BadRequest(result.Error);
    }

    [HttpPut("{returnRequestId}/receive")]
    [Authorize(Roles = UserRoles.Admin)]
    public async Task<IActionResult> ReceiveReturn(Guid returnRequestId, [FromBody] ReceiveReturnRequestBody request)
    {
        var command = new ReceiveReturnCommand(returnRequestId, request.ConditionOk, request.AdminNote);
        var result = await _mediator.Send(command);

        return result.IsSuccess ? Ok("Return items received and refund processed successfully.") : BadRequest(result.Error);
    }

    [HttpPut("{returnRequestId}/pickup")]
    [Authorize(Roles = UserRoles.Shipper)]
    public async Task<IActionResult> ConfirmPickup(Guid returnRequestId)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
                          ?? User.FindFirst("sub")?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("Shipper ID not found in token.");

        var shipperId = Guid.Parse(userIdClaim);
        var command = new ConfirmReturnPickupCommand(returnRequestId, shipperId);
        var result = await _mediator.Send(command);

        return result.IsSuccess ? Ok("Return items picked up successfully.") : BadRequest(result.Error);
    }
}
