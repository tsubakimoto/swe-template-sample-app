namespace PortfolioSite.Features.Slides;

public interface ISlideQueryService
{
    Task<IReadOnlyList<Slide>> GetAllAsync(CancellationToken cancellationToken);
    Task<IReadOnlyList<Slide>> GetFeaturedAsync(int count, CancellationToken cancellationToken);
    Task<Slide?> GetByIdAsync(string id, CancellationToken cancellationToken);
}
