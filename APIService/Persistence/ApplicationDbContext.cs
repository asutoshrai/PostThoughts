using APIService.Domain;
using APIService.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Data.Entity;


namespace APIService.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public IDbSet<FeedBack> FeedBacks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FeedBack>()
       .Property(e => e.CreatedOn)
       .HasColumnType("datetime2");

            modelBuilder.Entity<FeedBack>()
      .Property(e => e.UserId)
      .HasMaxLength(128);

            modelBuilder.Entity<FeedBack>()
      .Property(e => e.Data)
      .HasMaxLength(500);

            base.OnModelCreating(modelBuilder);
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }


}