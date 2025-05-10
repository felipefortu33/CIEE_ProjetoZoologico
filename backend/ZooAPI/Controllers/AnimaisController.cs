
using Microsoft.AspNetCore.Mvc;
using ZooAPI.Data;
using ZooAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ZooAPI.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class AnimaisController : ControllerBase {
        private readonly AppDbContext _context;

        public AnimaisController(AppDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Animal>>> Get() {
            return await _context.Animais.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Animal>> Post(Animal animal) {
            _context.Animais.Add(animal);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = animal.Id }, animal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Animal animal) {
            if (id != animal.Id) return BadRequest();
            _context.Entry(animal).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var animal = await _context.Animais.FindAsync(id);
            if (animal == null) return NotFound();
            _context.Animais.Remove(animal);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
