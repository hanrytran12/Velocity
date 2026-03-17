using Application.Interfaces;

namespace Infrastructure.Services;

public class VNPayService : IVNPayService
{
    public string CreatePaymentUrl(Guid orderId, decimal amount, string returnUrl)
    {
        // Mocking VNPay URL generation
        return $"https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount={amount * 100}&vnp_TxnRef={orderId}&vnp_OrderInfo=Order_{orderId}&vnp_ReturnUrl={returnUrl}";
    }

    public bool ValidateSignature(IDictionary<string, string> vnPayData, string vnpHashSecret)
    {
        // Mocking valid signature
        return true;
    }
}
