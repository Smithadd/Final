using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Dtos;

namespace backend
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainersController : ControllerBase
    {
        private readonly EntertainmentAgencyExampleContext _context;

        public EntertainersController(EntertainmentAgencyExampleContext context)
        {
            _context = context;
        }

        // ✅ GET: api/Entertainers (includes booking count)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntertainerWithBookingDto>>> GetEntertainers()
        {
            var entertainersWithBookings = await _context.Entertainers
                .Select(e => new EntertainerWithBookingDto
                {
                    EntertainerId = e.EntertainerId,
                    EntStageName = e.EntStageName,
                    EntStreetAddress = e.EntStreetAddress,
                    EntCity = e.EntCity,
                    EntState = e.EntState,
                    EntZipCode = e.EntZipCode,
                    EntPhoneNumber = e.EntPhoneNumber,
                    EntWebPage = e.EntWebPage,
                    EntEmailAddress = e.EntEmailAddress,
                    DateEntered = e.DateEntered.ToString(),
                    BookingCount = _context.Engagements.Count(en => en.EntertainerId == e.EntertainerId)
                })

                .ToListAsync();

            return entertainersWithBookings;
        }

        // GET: api/Entertainers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Entertainer>> GetEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);

            if (entertainer == null)
            {
                return NotFound();
            }

            return entertainer;
        }

        // PUT: api/Entertainers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntertainer(int id, Entertainer entertainer)
        {
            if (id != entertainer.EntertainerId)
            {
                return BadRequest();
            }

            _context.Entry(entertainer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntertainerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Entertainers
        [HttpPost]
        public async Task<ActionResult<Entertainer>> PostEntertainer(Entertainer entertainer)
        {
            _context.Entertainers.Add(entertainer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntertainer", new { id = entertainer.EntertainerId }, entertainer);
        }

        // DELETE: api/Entertainers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }

            _context.Entertainers.Remove(entertainer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntertainerExists(int id)
        {
            return _context.Entertainers.Any(e => e.EntertainerId == id);
        }
    }
}
