using Microsoft.AspNetCore.Mvc.RazorPages;
using PortfolioSite.Features.Slides;

namespace PortfolioSite.Pages;

public class IndexModel(ISlideQueryService slideQueryService) : PageModel
{
    public IReadOnlyList<Slide> FeaturedSlides { get; private set; } = [];

    public async Task OnGetAsync(CancellationToken cancellationToken)
    {
        FeaturedSlides = await slideQueryService.GetFeaturedAsync(6, cancellationToken);
    }
}
