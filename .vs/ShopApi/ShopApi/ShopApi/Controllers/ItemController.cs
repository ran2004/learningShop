using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopApi.Models;
using ShopApi.Services;

namespace ShopApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ILogger<ItemsController> _logger;
        private readonly ItemService _itemService;

        public ItemsController(ILogger<ItemsController> logger, ItemService itemService)
        {
            _logger = logger;
            _itemService = itemService;
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await this._itemService.GetAllItemsAsync();

            return Ok(items);
        }

        [Authorize(Roles = "User,Admin")]
        [HttpPatch("buy/{id}")]
        public async Task<IActionResult> BuyItem(int id)
        {
            try
            {
                var item = await _itemService.BuyItem(id);

                return CreatedAtAction(nameof(BuyItem), new { id = item.Id }, item);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("add/{id}")]
        public async Task<IActionResult> AddToItem(int id)
        {
            try
            {
                var item = await _itemService.AddItem(id);

                return CreatedAtAction(nameof(AddToItem), new { id = item.Id }, item);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> SaveItem([FromBody] Item itemToSave)
        {
            try
            {
                var savedItem = await _itemService.SaveItem(itemToSave);

                return CreatedAtAction(nameof(SaveItem), new { id = savedItem.Id }, savedItem);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            try
            {
                var isDeleted = await _itemService.DeleteItem(id);

                if (isDeleted)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound($"Item with ID {id} not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}