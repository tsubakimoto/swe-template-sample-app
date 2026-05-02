namespace PortfolioSite.Features.Slides;

public interface ISlideRepository
{
    Task<IReadOnlyList<Slide>> GetAllAsync(CancellationToken cancellationToken);
}
