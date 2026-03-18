using Application.Common.Models;

namespace Application.Interfaces;

public interface IIdentityService
{
    Task<Result<(Guid UserId, string FullName, string Token)>> LoginAsync(string email, string password);
    Task<Result<Guid>> RegisterAsync(string email, string password, string fullName);
    Task<bool> IsInRoleAsync(Guid userId, string roleName);
}
