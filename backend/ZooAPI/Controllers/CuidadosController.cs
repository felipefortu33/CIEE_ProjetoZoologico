
using Microsoft.AspNetCore.Mvc;
using ZooAPI.Data;
using ZooAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ZooAPI.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class CuidadosController : ControllerBase {
        private readonly AppDbContext _context;

        public CuidadosController(AppDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cuidado>>> Get() {
            return await _context.Cuidados.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Cuidado>> Post(Cuidado cuidado) {
            _context.Cuidados.Add(cuidado);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = cuidado.Id }, cuidado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Cuidado cuidado) {
            if (id != cuidado.Id) return BadRequest();
            _context.Entry(cuidado).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var cuidado = await _context.Cuidados.FindAsync(id);
            if (cuidado == null) return NotFound();
            _context.Cuidados.Remove(cuidado);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
