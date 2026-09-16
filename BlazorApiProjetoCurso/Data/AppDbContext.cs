using BlazorApiProjetoCurso.Models;
using Microsoft.EntityFrameworkCore;

namespace BlazorApiProjetoCurso.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            :base(options)
        {
            
        }

        public DbSet<Event> Events { get; set; }
    }
}
