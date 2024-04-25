using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend_APIs.Models
{
    public class TrainerConfig : IEntityTypeConfiguration<Trainer>
    {
        public void Configure(EntityTypeBuilder<Trainer> builder)
        {
            builder.Property(x => x.Status).HasDefaultValue("rejected");
        }
    }
}
