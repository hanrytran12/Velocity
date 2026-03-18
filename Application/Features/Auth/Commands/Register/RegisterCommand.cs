using Application.Common.Models;
using MediatR;

namespace Application.Features.Auth.Commands.Register;

public record RegisterCommand(string Email, string Password, string FullName) : IRequest<Result<Guid>>;
