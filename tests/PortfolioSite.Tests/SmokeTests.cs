using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;

namespace PortfolioSite.Tests;

public class SmokeTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _httpClient;

    public SmokeTests(WebApplicationFactory<Program> factory)
    {
        _httpClient = factory.CreateClient();
    }

    [Theory]
    [InlineData("/")]
    [InlineData("/slides")]
    public async Task PublicPages_ReturnSuccess(string path)
    {
        var response = await _httpClient.GetAsync(path);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(response.Headers.Contains("X-Content-Type-Options"));
    }

    [Fact]
    public async Task SlideDetails_ReturnsSuccess_ForKnownId()
    {
        var response = await _httpClient.GetAsync("/slides/github-copilot-cli-de-azure-portal-to-bicep");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task SlideDetails_ReturnsNotFound_ForUnknownId()
    {
        var response = await _httpClient.GetAsync("/slides/not-found");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
