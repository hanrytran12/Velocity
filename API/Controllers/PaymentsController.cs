using Application.Features.Payments.Commands.ProcessPayment;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PaymentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("vnpay-return")]
    public async Task<IActionResult> VNPayReturn(
        [FromQuery] string vnp_TxnRef,
        [FromQuery] string vnp_ResponseCode,
        [FromQuery] string vnp_TransactionNo)
    {
        // vnp_ResponseCode == "00" means success in VNPay
        var isSuccess = vnp_ResponseCode == "00";
        var orderId = Guid.Parse(vnp_TxnRef);

        var command = new ProcessPaymentCommand(orderId, isSuccess, vnp_TransactionNo);
        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return Ok(new { Message = isSuccess ? "Payment successful" : "Payment failed", OrderId = orderId });
        }

        return BadRequest(result.Error);
    }
}
