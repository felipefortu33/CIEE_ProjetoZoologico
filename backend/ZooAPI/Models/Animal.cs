
using System.ComponentModel.DataAnnotations;

namespace ZooAPI.Models {
    public class Animal {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        public string Descricao { get; set; }

        [Required]
        public DateTime DataNascimento { get; set; }

        [Required]
        public string Especie { get; set; }

        [Required]
        public string Habitat { get; set; }

        [Required]
        public string PaisOrigem { get; set; }
    }
}
