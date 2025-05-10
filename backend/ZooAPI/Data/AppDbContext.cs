
using Microsoft.EntityFrameworkCore;
using ZooAPI.Models;

namespace ZooAPI.Data {
    public class AppDbContext : DbContext {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Animal> Animais { get; set; }
        public DbSet<Cuidado> Cuidados { get; set; }
    }
}
