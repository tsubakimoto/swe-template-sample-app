# Vanilla JavaScript ○✕ゲーム

AI と対戦できる Vanilla JavaScript 製の ○✕ゲームです。  
ロジック (`src/gameLogic.js`) と UI (`src/ui.js`) を分離し、`src/controller.js` で接続しています。

## セットアップ

```bash
npm install
```

## 起動方法

```bash
npm run dev
```

`http://localhost:8000` で動作します。

## Dev Container での起動方法

1. VS Code で本リポジトリを開く
2. コマンドパレットから **Dev Containers: Reopen in Container** を実行
3. コンテナ起動後に依存関係をインストール

```bash
npm install
```

4. 開発サーバーを起動

```bash
npm run dev
```

必要に応じてポート `8000` をフォワードしてアクセスしてください。

## テスト

```bash
npm test
```

`npm test` 実行時にカバレッジを自動計測し、しきい値（lines/functions/branches/statements: 80%）を検証します。

## ビルド

```bash
npm run build
```

## 遊び方

- あなたは **○**、AI は **✕** です。
- マスをクリック（またはキーボードでフォーカスして Enter / Space）して手を打ちます。
- Human が勝つと `Win Count` が増え、Human が負けると `0` にリセットされます。
- AI 思考時間を毎手表示し、`500ms` 以下かを確認できます。
- 「もう一度遊ぶ」でリセットできます。

## 主要ファイル

- `index.html`: 画面エントリーポイント
- `styles/main.css`: レスポンシブ UI / ダークモード
- `src/gameLogic.js`: 勝敗判定・最善手（ミニマックス）
- `src/ui.js`: DOM 描画・アクセシビリティ対応ボタン
- `src/controller.js`: ゲーム進行制御
- `tests/*.test.js`: ロジックと UI のテスト
