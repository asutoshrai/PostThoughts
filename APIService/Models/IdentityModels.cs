using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using APIService.Domain;
using System.Security.Principal;

namespace APIService.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            userIdentity.AddClaim(new Claim("FirstName", UserInfo.FirstName));
            userIdentity.AddClaim(new Claim("LastNameName", UserInfo.FirstName));
            userIdentity.AddClaim(new Claim("SchoolName", UserInfo.SchoolName));
            return userIdentity;
        }

        public virtual UserInfo UserInfo  { get; set; }
}

   


}