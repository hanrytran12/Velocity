using Application.Common.Models;
using MediatR;

namespace Application.Features.Returns.Commands.CreateReturnRequest;

public record CreateReturnRequestCommand(
    Guid CustomerId,
    Guid OrderId,
    string Reason,
    List<string> EvidenceUrls) : IRequest<Result>;

public record CreateReturnRequestBody(
    string Reason,
    List<string> EvidenceUrls);
