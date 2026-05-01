namespace PortfolioSite.Features.Slides;

public sealed class SlideQueryService(ISlideRepository repository) : ISlideQueryService
{
    public Task<IReadOnlyList<Slide>> GetAllAsync(CancellationToken cancellationToken) => repository.GetAllAsync(cancellationToken);

    public async Task<IReadOnlyList<Slide>> GetFeaturedAsync(int count, CancellationToken cancellationToken)
    {
        var slides = await repository.GetAllAsync(cancellationToken);
        return slides
            .OrderByDescending(x => x.PublishedOn)
            .Take(count)
            .ToArray();
    }

    public async Task<Slide?> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        var slides = await repository.GetAllAsync(cancellationToken);
        return slides.FirstOrDefault(x => string.Equals(x.Id, id, StringComparison.OrdinalIgnoreCase));
    }
}
