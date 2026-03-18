using Application.Common.Models;
using Application.Features.Auth.Common;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Auth.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, Result<AuthResponse>>
{
    private readonly IIdentityService _identityService;

    public LoginCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result<AuthResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.LoginAsync(request.Email, request.Password);

        if (!result.IsSuccess)
        {
            return Result<AuthResponse>.Failure(result.Error);
        }

        var (userId, fullName, token) = result.Value;
        return Result<AuthResponse>.Success(new AuthResponse(userId, fullName, token));
    }
}
