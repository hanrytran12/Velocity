using Domain.Enums;

namespace Domain.Entities;

public class ReturnRequest
{
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public ReturnRequestStatus Status { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string? AdminNote { get; set; }
    public List<string> EvidenceUrls { get; set; } = new List<string>();
    public DateTime RequestedAt { get; set; }
    public Guid? ShipperId { get; set; }
    
    public Order? Order { get; set; }
    public ApplicationUser? Shipper { get; set; }
}
