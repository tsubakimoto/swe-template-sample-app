# 実装メモ

## 構成

- `src/game.js`: 盤面更新、合法手、勝敗判定
- `src/ai.js`: minimax 実装
- `src/ui.js`: DOM 描画
- `src/main.js`: ゲーム進行制御 (Human vs AI)

## テスト方針

- `tests/game.test.js`: ゲームロジック単体テスト
- `tests/ai.test.js`: AI の手選択テスト
- `tests/ui.test.js`: クリック操作〜表示更新の統合テスト
