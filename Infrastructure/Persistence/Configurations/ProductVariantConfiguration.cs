using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ProductVariantConfiguration : IEntityTypeConfiguration<ProductVariant>
{
    public void Configure(EntityTypeBuilder<ProductVariant> builder)
    {
        builder.HasKey(pv => pv.Id);
        
        builder.Property(pv => pv.Size)
            .IsRequired()
            .HasMaxLength(20);
            
        builder.Property(pv => pv.Color)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(pv => pv.ColorHex)
            .HasMaxLength(20);

        builder.Property(pv => pv.SKU)
            .IsRequired()
            .HasMaxLength(100);
            
        builder.HasIndex(pv => pv.SKU)
            .IsUnique();
    }
}
