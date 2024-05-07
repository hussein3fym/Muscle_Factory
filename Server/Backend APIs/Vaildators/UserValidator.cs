using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Backend_APIs.Validators
{
    public class CustomUserValidator<TUser> : IUserValidator<TUser> where TUser : class
    {
        public Task<IdentityResult> ValidateAsync(UserManager<TUser> manager, TUser user)
        {
            // You can add custom validation logic here if needed

            // Returning success without performing any checks
            return Task.FromResult(IdentityResult.Success);
        }
    }
}