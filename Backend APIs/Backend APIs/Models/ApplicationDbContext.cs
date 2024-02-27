using Microsoft.EntityFrameworkCore;





namespace Backend_APIs.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options) :base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<User_Photo> user_Photos { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Question>()
               .HasOne(a => a.User)
               .WithMany(q => q.Questions)
               .HasForeignKey(a => a.UserId)
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Blog>()
                 .HasOne(a => a.User)
               .WithMany(b => b.Blogs)
               .HasForeignKey(a => a.AdminId)
               .OnDelete(DeleteBehavior.Cascade)
               .OnDelete(DeleteBehavior.SetNull);



            modelBuilder.Entity<Blog>()
                 .HasOne(t => t.Trainer)
               .WithMany(b => b.Blogs)
               .HasForeignKey(a => a.TrainerId)
               .OnDelete(DeleteBehavior.Cascade)
               .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Blog>()
           .Property(p => p.AdminId).IsRequired(required: false);
            modelBuilder.Entity<Blog>()
          .Property(p => p.TrainerId).IsRequired(required: false);
            modelBuilder.Entity<User_Photo>()
               .HasOne(a => a.User)
               .WithMany(q => q.User_Photos)
               .HasForeignKey(a => a.UserID)
               .OnDelete(DeleteBehavior.Cascade);




        }
    }
}
