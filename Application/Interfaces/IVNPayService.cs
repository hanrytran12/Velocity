namespace Application.Interfaces;

public interface IVNPayService
{
    string CreatePaymentUrl(Guid orderId, decimal amount, string returnUrl);
    bool ValidateSignature(IDictionary<string, string> vnPayData, string vnpHashSecret);
}
