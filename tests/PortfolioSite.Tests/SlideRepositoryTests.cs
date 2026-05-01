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
}
