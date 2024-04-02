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
        public DbSet<Exercise> Exercises { get; set; }
       
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Comment> Comments { get; set; }
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

            modelBuilder.Entity<Comment>()
            .HasOne(a => a.Question)
            .WithMany(q => q.Comments)
            .HasForeignKey(a => a.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Exercise>()
            .HasOne(a => a.Trainer)
            .WithMany(q => q.Exercises)
            .HasForeignKey(a => a.TrainerId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Exercise>()
             .HasOne(a => a.User)
             .WithMany(q => q.Exercises)
             .HasForeignKey(a => a.UserId)
             .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Comment>()
             .HasOne(a => a.Trainer)
             .WithMany(q => q.Comments)
             .HasForeignKey(a => a.TrainerId)
             .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Comment>()
             .HasOne(a => a.User)
             .WithMany(q => q.Comments)
             .HasForeignKey(a => a.UserId)
             .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<Comment>()
             .HasOne(a => a.Question)
             .WithMany(q => q.Comments)
             .HasForeignKey(a => a.QuestionId)
             .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
