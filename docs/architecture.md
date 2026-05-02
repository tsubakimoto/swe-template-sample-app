# Architecture

## Application layers

- `Features/Slides`
  - `ISlideRepository` / `JsonSlideRepository`
  - `ISlideQueryService` / `SlideQueryService`
- `Pages`
  - `Index` : featured slides
  - `Slides/Index` : all slides
  - `Slides/Details` : single slide

## Data source

- `src/PortfolioSite/Data/slides.json`
- Seed is based on public data from `https://speakerdeck.com/tsubakimoto_s.rss`

## Non-functional

- Responsive UI with Tailwind CSS v4
- Dark mode (`dark:` utilities)
- SEO meta (`description`, Open Graph, canonical)
- Accessibility:
  - skip link
  - semantic headings
  - alt text
  - focus-visible outline
- Security headers:
  - CSP
  - X-Content-Type-Options
  - X-Frame-Options
  - Referrer-Policy
  - Permissions-Policy
