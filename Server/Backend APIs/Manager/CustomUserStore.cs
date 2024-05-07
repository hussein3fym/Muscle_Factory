using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Backend_APIs.Manager
{
    public class CustomUserStore : UserStore<Backend_APIs.Models.User, IdentityRole<int>, ApplicationDbContext, int>
    {
        public CustomUserStore(ApplicationDbContext context, IdentityErrorDescriber describer = null)
            : base(context, describer) { }

        public override Task<Backend_APIs.Models.User> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken = default)
        {
            // Disable unique username check by not using FindByNameAsync
            return Task.FromResult<Backend_APIs.Models.User>(null);
        }
    }
}