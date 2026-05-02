using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PortfolioSite.Features.Slides;
using PortfolioSite.Pages.Slides;

namespace PortfolioSite.Tests;

public class SlideDetailsPageModelTests
{
    [Fact]
    public async Task OnGetAsync_ReturnsNotFoundWhenSlideDoesNotExist()
    {
        var model = new DetailsModel(new StubSlideQueryService(null));

        var result = await model.OnGetAsync("missing", CancellationToken.None);

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task OnGetAsync_SetsSlideWhenFound()
    {
        var slide = new Slide { Id = "slide-1", Title = "Slide 1", SpeakerDeckUrl = "https://speakerdeck.com/tsubakimoto_s/slide-1", PreviewImageUrl = "https://example.com/1.jpg" };
        var model = new DetailsModel(new StubSlideQueryService(slide));

        var result = await model.OnGetAsync("slide-1", CancellationToken.None);

        Assert.IsType<PageResult>(result);
        Assert.Equal("slide-1", model.Slide!.Id);
    }

    private sealed class StubSlideQueryService(Slide? slide) : ISlideQueryService
    {
        public Task<IReadOnlyList<Slide>> GetAllAsync(CancellationToken cancellationToken) => Task.FromResult<IReadOnlyList<Slide>>([]);
        public Task<Slide?> GetByIdAsync(string id, CancellationToken cancellationToken) => Task.FromResult(slide);
        public Task<IReadOnlyList<Slide>> GetFeaturedAsync(int count, CancellationToken cancellationToken) => Task.FromResult<IReadOnlyList<Slide>>([]);
    }
}
