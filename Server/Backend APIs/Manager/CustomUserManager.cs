using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace Backend_APIs.Manager
{
 
    public class CustomUserManager : UserManager<Backend_APIs.Models.User>
    {
        public CustomUserManager(
            IUserStore<Backend_APIs.Models.User> store,
            IOptions<IdentityOptions> optionsAccessor,
            IPasswordHasher<Backend_APIs.Models.User> passwordHasher,
            IEnumerable<IUserValidator<Backend_APIs.Models.User>> userValidators,
            IEnumerable<IPasswordValidator<Backend_APIs.Models.User>> passwordValidators,
            ILookupNormalizer keyNormalizer,
            IdentityErrorDescriber errors,
            IServiceProvider services,
            ILogger<UserManager<Backend_APIs.Models.User>> logger)
            : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
        }

            public override async Task<IdentityResult> CreateAsync(Backend_APIs.Models.User user)
        {
            var result = await base.CreateAsync(user);
            if (!result.Succeeded)
            {
                // Check if the error is related to a duplicate username
                var duplicateUserNameError = result.Errors.FirstOrDefault(e => e.Code == "DuplicateUserName");
                if (duplicateUserNameError != null)
                {
                    // Create a new list of errors excluding the duplicate username error
                    var errors = result.Errors.Where(e => e != duplicateUserNameError).ToList();
                    result = IdentityResult.Failed(errors.ToArray());
                }
            }
            return result;
        }
    }
}
