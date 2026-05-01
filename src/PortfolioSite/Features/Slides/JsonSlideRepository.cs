using Microsoft.Extensions.Options;
using System.Text.Json;

namespace PortfolioSite.Features.Slides;

public sealed class JsonSlideRepository(IOptions<SlideDataOptions> options) : ISlideRepository
{
    private readonly SlideDataOptions _options = options.Value;
    private IReadOnlyList<Slide>? _cache;

    public async Task<IReadOnlyList<Slide>> GetAllAsync(CancellationToken cancellationToken)
    {
        if (_cache is not null)
        {
            return _cache;
        }

        if (string.IsNullOrWhiteSpace(_options.JsonPath))
        {
            throw new InvalidOperationException("SlideDataOptions.JsonPath is required.");
        }

        await using var stream = File.OpenRead(_options.JsonPath);
        var slides = await JsonSerializer.DeserializeAsync<List<Slide>>(stream, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }, cancellationToken);

        _cache = slides?
            .OrderByDescending(x => x.PublishedOn)
            .ToArray()
            ?? [];

        return _cache;
    }
}
