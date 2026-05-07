# Tic Tac Toe

## 概要

Vanilla JavaScript で実装した Human vs AI の 3x3 ○×ゲームです。

## ルール

- Human は O、AI は X を使います。
- 先手は Human です。
- 3 つ並べると勝ちです。
- 盤面が埋まって勝者がいない場合は引き分けです。

## 実装方針

- `src/game.js`
  - 盤面管理と勝敗判定を純粋関数で実装
- `src/ai.js`
  - ミニマックスで AI の手を決定
- `src/ui.js`
  - DOM 描画とイベント処理
- `src/index.js`
  - 初期化処理

## 今後の拡張案

- 難易度レベル追加
- 対人戦モード追加
- LocalStorage による履歴保存
