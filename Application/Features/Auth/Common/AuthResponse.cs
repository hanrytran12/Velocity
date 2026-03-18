namespace Application.Features.Auth.Common;

public record AuthResponse(Guid UserId, string FullName, string Token);
