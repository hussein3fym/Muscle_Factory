using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Backend_APIs.Models
{
    public class User : IdentityUser<int>
    {
        public string? Age { get; set; }
        [MaxLength(length: 6)]
        public string? Gender { get; set; }
        public string? Status { get; set; }
        public string? Experience { get; set; }
        public string? Specialization { get; set; }
        public byte[]? CvFile { get; set; }
        public byte[]? Photo { get; set; }
        public virtual ICollection<Blog>? Blogs { get; set; }
        public virtual ICollection<User_Photo>? User_Photos { get; set; }
        public virtual ICollection<Exercise>? Exercises { get; set; }
        public virtual ICollection<Transformation>? Transformations { get; set; }
        public virtual ICollection<Certificate>? Certificates { get; set; }
    }
}
