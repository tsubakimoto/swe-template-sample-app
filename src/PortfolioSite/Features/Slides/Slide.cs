namespace PortfolioSite.Features.Slides;

public sealed class Slide
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public string Description { get; init; } = string.Empty;
    public DateOnly PublishedOn { get; init; }
    public required string SpeakerDeckUrl { get; init; }
    public string? PreviewImageUrl { get; init; }
    public string[] Tags { get; init; } = [];
}
