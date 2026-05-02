using Microsoft.Extensions.Options;
using PortfolioSite.Features.Slides;

namespace PortfolioSite.Tests;

public class SlideRepositoryTests
{
    [Fact]
    public async Task GetAllAsync_ReturnsSlidesFromJson()
    {
        var options = Options.Create(new SlideDataOptions
        {
            JsonPath = Path.Combine(AppContext.BaseDirectory, "TestData", "slides.test.json")
        });

        var repository = new JsonSlideRepository(options);
        var slides = await repository.GetAllAsync(CancellationToken.None);

        Assert.Equal(2, slides.Count);
        Assert.Equal("sample-slide", slides[0].Id);
    }

    [Fact]
    public async Task GetAllAsync_UsesSingleCacheInstance_WhenCalledConcurrently()
    {
        var options = Options.Create(new SlideDataOptions
        {
            JsonPath = Path.Combine(AppContext.BaseDirectory, "TestData", "slides.test.json")
        });

        var repository = new JsonSlideRepository(options);
        var tasks = Enumerable.Range(0, 32)
            .Select(_ => repository.GetAllAsync(CancellationToken.None))
            .ToArray();

        var results = await Task.WhenAll(tasks);
        var first = results[0];
        Assert.All(results, result => Assert.Same(first, result));
    }
}
