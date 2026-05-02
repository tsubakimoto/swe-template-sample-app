# Portfolio Site Implementation with .NET 10, ASP.NET Core 10 Razor Pages, and Tailwind CSS v4

## 背景/目的

このリポジトリを、SpeakerDeck ポートフォリオ (https://speakerdeck.com/tsubakimoto_s) をベースとした、モダンな Web ポートフォリオサイトとして実装します。最新の .NET 10 & ASP.NET Core 10 Razor Pages を採用し、Tailwind CSS v4 によるレスポンシブ UI を実装し、Azure App Service Linux へのデプロイを実現します。

## 対象スコープ (Phase 1: MVP)

このイシューは Phase 1 (MVP) を対象としており、基本的なポートフォリオサイト機能の実装に限定します。拡張機能は Phase 2 以降で検討します。

## 要件一覧 (Phase 1)

### 1. アプリケーション開発

#### プロジェクト構成
- [ ] .NET 10 & ASP.NET Core 10 Razor Pages プロジェクト構築
- [ ] プロジェクト構成: Web アプリケーション
- [ ] ターゲット フレームワーク: net10.0
- [ ] C# 13 使用（.NET 10 デフォルト）

#### UI 実装
- [ ] Tailwind CSS v4 セットアップ（Lightning CSS 統合）
- [ ] レスポンシブデザイン（モバイル・タブレット・デスクトップ）
- [ ] ダークモード対応
- [ ] アクセシビリティ対応（WCAG 2.1 Level AA）

#### ページ・機能
- [ ] **ホームページ**
  - [ ] プロフィール セクション
  - [ ] スキル・経歴 セクション
  - [ ] 最新スライドを表示
- [ ] **スライド一覧ページ**
  - [ ] すべてのスライドをカード表示
  - [ ] 日付・タイトル・説明表示
  - [ ] カテゴリ・タグによるフィルタリング
  - [ ] ページネーション（1ページ 12 件表示）
- [ ] **スライド詳細ページ**
  - [ ] スライド情報（タイトル・説明・日付・カテゴリ）
  - [ ] SpeakerDeck への外部リンク
  - [ ] 関連スライドの推奨

#### データ管理
- [ ] スライドデータを JSON ファイル (wwwroot/data/slides.json) で管理
- [ ] データスキーマ定義済み

#### SEO & Performance
- [ ] メタタグ管理（title, description, og:* タグ）
- [ ] 構造化データ（Schema.org）
- [ ] Core Web Vitals 最適化
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms（CLS < 0.1）
- [ ] 画像最適化（WebP, avif サポート）
- [ ] キャッシング戦略実装

### 2. インフラストラクチャ & デプロイ

#### Bicep テンプレート
- [ ] **main.bicep** - メインテンプレート
- [ ] Azure App Service (Linux)
  - [ ] OS: Linux
  - [ ] Runtime Stack: .NET 10
  - [ ] App Service Plan: Standard (S1 最小)
  - [ ] Always On: true
- [ ] Application Insights 統合
- [ ] Azure Storage Account（静的ファイル/ロギング用）
- [ ] Key Vault（将来の設定管理用）

#### CI/CD パイプライン (GitHub Actions)
- [ ] **build.yml** - ビルド・テスト
  - [ ] .NET ビルド (Release 構成)
  - [ ] ユニットテスト実行
  - [ ] コード解析（StyleCop Analyzers）
- [ ] **deploy-staging.yml** - ステージング環境へのデプロイ
- [ ] **deploy-production.yml** - 本番環境へのデプロイ
  - [ ] 手動承認トリガー
  - [ ] Bicep からの自動デプロイ

#### セキュリティ
- [ ] HTTPS の強制
- [ ] セキュリティヘッダ（HSTS, CSP など）
- [ ] CORS 設定

### 3. テスト戦略

- [ ] **ユニットテスト** (xUnit)
  - [ ] Razor Page の Model テスト
  - [ ] Service/Repository テスト
  - [ ] カバレッジ目標: 70% 以上
- [ ] **統合テスト**
  - [ ] ページレンダリングテスト

### 4. ドキュメント

- [ ] **README.md** - セットアップ・開発ガイド
- [ ] **docs/ARCHITECTURE.md** - アーキテクチャ・ディレクトリ構成
- [ ] **docs/DEPLOYMENT.md** - デプロイメント手順
- [ ] **.devcontainer/devcontainer.json** - 開発環境定義

## 受け入れ条件

1. ✅ プロジェクトが .NET 10 & ASP.NET Core 10 で実装されている
2. ✅ すべてのページが Tailwind CSS v4 で実装されている
3. ✅ ローカル Dev Container 環境で起動・実行可能
4. ✅ スライド一覧・詳細ページが正常に動作
5. ✅ Core Web Vitals: LCP < 2.5s, CLS < 0.1 を達成
6. ✅ WCAG 2.1 Level AA に準拠
7. ✅ Azure App Service (Linux) 上でデプロイ・実行可能
8. ✅ Bicep テンプレートで Azure リソースが自動生成される
9. ✅ CI/CD パイプラインが正常に動作（GitHub Actions）
10. ✅ すべてのドキュメントが完備されている
11. ✅ ユニットテスト カバレッジ: 70% 以上

## 技術情報・検討結果

### .NET 10 & ASP.NET Core 10
- **リリース予定**: 2025 年 4 月（LTS リリース）
- **Razor Pages**: 引き続きフルサポート
- **推奨**: Preview/RC 版での検証

### Tailwind CSS v4
- **リリース**: 2024 年 5 月
- **特徴**: Lightning CSS 統合、パフォーマンス向上
- **セットアップ**: npm + PostCSS with Lightning CSS

### Azure App Service (Linux)
- **Runtime Stack**: aspnet:10.0
- **デプロイ**: Bicep + GitHub Actions

### Bicep
- **バージョン**: v0.24 以上

## 既知の制限事項・未確定事項

- [ ] SpeakerDeck API: 公開 API なし → JSON ファイルによる管理
- [ ] データベース: Phase 1 では未使用
- [ ] ユーザー認証: Phase 1 では未実装
- [ ] CDN: Phase 2 で検討

## Phase 1 の完了基準

1. ✅ すべてのチェックリスト完了
2. ✅ すべての受け入れ条件達成
3. ✅ Core Web Vitals が良好範囲内
4. ✅ ユニットテスト 70% 以上カバレッジ
5. ✅ 本番環境で正常に動作確認
6. ✅ ドキュメント完備・レビュー済み

## Phase 2 で検討する機能

- [ ] SpeakerDeck API 自動取得
- [ ] データベース統合
- [ ] 管理画面
- [ ] CDN 統合
- [ ] ページ解析（Google Analytics）
