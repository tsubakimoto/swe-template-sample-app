using Microsoft.AspNetCore.Mvc.RazorPages;
using PortfolioSite.Features.Slides;

namespace PortfolioSite.Pages.Slides;

public class IndexModel(ISlideQueryService slideQueryService) : PageModel
{
    public IReadOnlyList<Slide> Slides { get; private set; } = [];

    public async Task OnGetAsync(CancellationToken cancellationToken)
    {
        Slides = await slideQueryService.GetAllAsync(cancellationToken);
    }
}
