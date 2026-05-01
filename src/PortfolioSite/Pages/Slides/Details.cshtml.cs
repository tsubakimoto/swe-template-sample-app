using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PortfolioSite.Features.Slides;

namespace PortfolioSite.Pages.Slides;

public class DetailsModel(ISlideQueryService slideQueryService) : PageModel
{
    public Slide? Slide { get; private set; }

    public async Task<IActionResult> OnGetAsync(string id, CancellationToken cancellationToken)
    {
        Slide = await slideQueryService.GetByIdAsync(id, cancellationToken);
        if (Slide is null)
        {
            return NotFound();
        }

        if (PageContext?.ViewData is { } viewData)
        {
            viewData["Title"] = $"{Slide.Title} | Slides";
            viewData["Description"] = Slide.Description;
        }
        return Page();
    }
}
