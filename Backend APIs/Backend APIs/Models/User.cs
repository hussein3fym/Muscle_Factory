using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Backend_APIs.Models
{
    public class User
    {
        public int Id { get; set; }

        [MaxLength(length:100)]
        public string Name { get; set; }

        [MaxLength(length: 100)]
        public string Email { get; set; }
        [MaxLength(length: 30)]
        public string Password { get; set; }
        [MaxLength(length: 5)]

        public string Type { get; set; } = "user";
        public int? Age { get; set; }
        [MaxLength(length: 6)]
        public string? Gender { get; set; }
        public virtual ICollection<Question> Questions { get; set;}
        public virtual ICollection<Blog> Blogs { get; set; }
        public virtual ICollection<User_Photo> User_Photos { get; set; }
    }
}
