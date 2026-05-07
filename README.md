# Tic Tac Toe (Vanilla JavaScript)

ブラウザで遊べる 3x3 の ○×ゲームです。Human (O) と AI (X) が対戦します。

## セットアップ

```bash
npm install
```

## 起動方法

```bash
npm run dev
```

起動後、`http://localhost:8000` をブラウザで開いてプレイできます。

## テスト

```bash
npm test
```

ウォッチモード:

```bash
npm run test:watch
```

## 実装内容

- 3x3 盤面のゲーム UI（Vanilla JS + CSS）
- 勝ち/引き分け判定
- New Game ボタンでのリセット
- ミニマックスによる AI（Human vs AI）
- ゲームロジック/AI のユニットテスト

## ファイル構成

- `index.html`: エントリーポイント
- `styles/main.css`: レスポンシブスタイル
- `src/game.js`: 純粋関数中心のゲームロジック
- `src/ai.js`: AI の手選択（ミニマックス）
- `src/ui.js`: DOM 描画とイベント処理
- `src/index.js`: 初期化処理
- `tests/*.test.js`: ユニットテスト
- `docs/TIC_TAC_TOE.md`: 仕様メモ
