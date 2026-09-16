using System.ComponentModel.DataAnnotations;

namespace BlazorApiProjetoCurso.Dto
{
    public class EventDto
    {
        [Required(ErrorMessage = "O titulo é obrigatorio")]
        public string Title { get; set; } = string.Empty;
        [MaxLength(100, ErrorMessage = "O campo descrição comporta apenas 500 caracterezs")]
        public string Description { get; set; } = string.Empty;
        [Required(ErrorMessage = "A data de inicio é obrigatorio")]
        public DateTime Start { get; set; }

        public DateTime? End { get; set; }

        public bool AllDay { get; set; }
    }
}
