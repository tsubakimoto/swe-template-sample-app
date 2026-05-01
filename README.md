# Portfolio Site (.NET 10 / Razor Pages / Tailwind CSS v4)

SpeakerDeck の公開スライドを表示するポートフォリオサイトです。

## Tech stack

- .NET 10 / ASP.NET Core Razor Pages
- Tailwind CSS v4
- JSON ベースのスライドデータ
- Azure App Service (Linux) + Bicep
- GitHub Actions (build / deploy)

## Pages

- `/` : トップページ（最新スライド）
- `/slides` : スライド一覧
- `/slides/{id}` : スライド詳細

## Local development

```bash
npm ci
npm run build:css
dotnet restore PortfolioSite.sln
dotnet run --project src/PortfolioSite
```

## Test

```bash
dotnet test PortfolioSite.sln
```

## Infrastructure

- `infra/main.bicep` : App Service Plan + Linux Web App + App Insights
- `infra/main.staging.bicepparam`
- `infra/main.production.bicepparam`

## Deployment

- Build workflow: `.github/workflows/build.yml`
- Deploy workflow: `.github/workflows/deploy.yml`
  - `main` push -> staging deploy
  - `workflow_dispatch` + `production` -> production deploy
