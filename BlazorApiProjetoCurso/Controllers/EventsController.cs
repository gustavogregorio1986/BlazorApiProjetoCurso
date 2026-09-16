using BlazorApiProjetoCurso.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlazorApiProjetoCurso.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetEvents()
        {
            var evets = _context.Events.OrderBy(e => e.Id).ToList();
            return Ok(evets);
        }

        [HttpGet("{id}")] 
        public IActionResult GetEvent(int id) 
        {
            var events = _context.Events.Find(id);

            if(events == null)
            {
                return NotFound();
            }

            return Ok(events);
        }
    }
}
