
using System.ComponentModel.DataAnnotations;

namespace ZooAPI.Models {
    public class Cuidado {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        public string Descricao { get; set; }

        [Required]
        public string Frequencia { get; set; }
    }
}
