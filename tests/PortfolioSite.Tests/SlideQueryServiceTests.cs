using PortfolioSite.Features.Slides;

namespace PortfolioSite.Tests;

public class SlideQueryServiceTests
{
    [Fact]
    public async Task GetFeaturedAsync_ReturnsLatestSlides()
    {
        var repository = new StubSlideRepository([
            CreateSlide("older-slide", 2024, 1, 1),
            CreateSlide("latest-slide", 2025, 1, 1),
            CreateSlide("middle-slide", 2024, 6, 1)
        ]);

        var service = new SlideQueryService(repository);
        var featured = await service.GetFeaturedAsync(2, CancellationToken.None);

        Assert.Equal(["latest-slide", "middle-slide"], featured.Select(x => x.Id).ToArray());
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsNullWhenUnknown()
    {
        var service = new SlideQueryService(new StubSlideRepository([]));
        var result = await service.GetByIdAsync("missing", CancellationToken.None);

        Assert.Null(result);
    }

    private static Slide CreateSlide(string id, int year, int month, int day)
        => new()
        {
            Id = id,
            Title = id,
            Description = id,
            PublishedOn = new DateOnly(year, month, day),
            SpeakerDeckUrl = $"https://speakerdeck.com/tsubakimoto_s/{id}",
            PreviewImageUrl = "https://example.com/slide.jpg",
            Tags = ["test"]
        };

    private sealed class StubSlideRepository(IReadOnlyList<Slide> slides) : ISlideRepository
    {
        public Task<IReadOnlyList<Slide>> GetAllAsync(CancellationToken cancellationToken) => Task.FromResult(slides);
    }
}
