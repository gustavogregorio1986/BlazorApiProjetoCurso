using System.ComponentModel.DataAnnotations;

namespace BlazorFrontEndProjetoCurso.Dto
{
    public class EventDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
        public bool AllDay { get; set; }
    }
}
