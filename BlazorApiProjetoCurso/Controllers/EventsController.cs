using BlazorApiProjetoCurso.Data;
using BlazorApiProjetoCurso.Dto;
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

        [HttpPost]
        public IActionResult CreateEvent(EventDto eventDto)
        {
            var evento = new Models.Event
            {
                Title = eventDto.Title,
                Description = eventDto.Description,
                Start = eventDto.Start,
                End = eventDto.End,
                AllDay = eventDto.AllDay,
                CreatedAt = DateTime.Now
            };
            _context.Events.Add(evento);
            _context.SaveChanges();
            return Ok(evento); 
        }

        [HttpPut("{id}")]
        public IActionResult EditEvent(int id, EventDto eventDto)
        {
            var evento = _context.Events.Find(id);

            if (evento == null) return NotFound();

            evento.Title = eventDto.Title;
            evento.Description = eventDto.Description;
            evento.Start = eventDto.Start;
            evento.End = eventDto.End;
            evento.AllDay = eventDto.AllDay;

            _context.SaveChanges();
            return Ok(evento);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var evento = _context.Events.Find(id);

            if (evento == null) return NotFound();

            _context.Events.Remove(evento);
            _context.SaveChanges();
            return Ok();
        }
    }
}
