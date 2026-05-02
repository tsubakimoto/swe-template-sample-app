using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using PortfolioSite.Features.Slides;

namespace PortfolioSite.Tests;

public class SlideImageRenderingTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _httpClient;

    public SlideImageRenderingTests(WebApplicationFactory<Program> factory)
    {
        _httpClient = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                services.RemoveAll<ISlideQueryService>();
                services.AddSingleton<ISlideQueryService>(new StubSlideQueryService());
            });
        }).CreateClient();
    }

    [Theory]
    [InlineData("/")]
    [InlineData("/slides")]
    [InlineData("/slides/slide-without-preview")]
    public async Task Pages_DoNotRenderEmptyImageAttributes_WhenPreviewImageMissing(string path)
    {
        var response = await _httpClient.GetAsync(path);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        Assert.DoesNotContain("src=\"\"", content, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("property=\"og:image\" content=\"\"", content, StringComparison.OrdinalIgnoreCase);
    }

    private sealed class StubSlideQueryService : ISlideQueryService
    {
        private readonly Slide[] _slides =
        [
            new()
            {
                Id = "slide-without-preview",
                Title = "No Preview Slide",
                Description = "Description",
                PublishedOn = new DateOnly(2025, 1, 1),
                SpeakerDeckUrl = "https://speakerdeck.com/tsubakimoto_s/slide-without-preview",
                PreviewImageUrl = null,
                Tags = []
            }
        ];

        public Task<IReadOnlyList<Slide>> GetAllAsync(CancellationToken cancellationToken) => Task.FromResult<IReadOnlyList<Slide>>(_slides);
        public Task<Slide?> GetByIdAsync(string id, CancellationToken cancellationToken) => Task.FromResult<Slide?>(_slides.Single(x => x.Id == id));
        public Task<IReadOnlyList<Slide>> GetFeaturedAsync(int count, CancellationToken cancellationToken) => Task.FromResult<IReadOnlyList<Slide>>(_slides.Take(count).ToArray());
    }
}
