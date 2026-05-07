import { beforeEach, describe, expect, it } from 'vitest';
import { createGameController } from '../src/main.js';

function setupDom() {
  document.body.innerHTML = `
    <main class="container">
      <h1>○✕ゲーム</h1>
      <p id="status" class="status" aria-live="polite"></p>
      <p id="win-count" class="meta">Win Count: 0</p>
      <p id="ai-time" class="meta" aria-live="polite">AI 思考時間: -</p>
      <div id="board" class="board" role="group" aria-label="ゲーム盤面"></div>
      <button id="restart" class="restart" type="button">もう一度遊ぶ</button>
    </main>
  `;
}

describe('ui integration', () => {
  beforeEach(() => {
    setupDom();
  });

  it('renders initial board and status', () => {
    const game = createGameController({
      boardElement: document.getElementById('board'),
      statusElement: document.getElementById('status'),
      winCountElement: document.getElementById('win-count'),
      aiTimeElement: document.getElementById('ai-time'),
      restartButton: document.getElementById('restart'),
    });

    game.init();

    expect(document.querySelectorAll('.cell')).toHaveLength(9);
    expect(document.getElementById('status').textContent).toBe('あなた (○) の手番です');
  });

  it('updates board on click and triggers AI response', () => {
    const game = createGameController({
      boardElement: document.getElementById('board'),
      statusElement: document.getElementById('status'),
      winCountElement: document.getElementById('win-count'),
      aiTimeElement: document.getElementById('ai-time'),
      restartButton: document.getElementById('restart'),
    });

    game.init();

    document.querySelector('[data-index="0"]').click();

    expect(document.querySelector('[data-index="0"]').textContent).toBe('○');
    expect(document.querySelectorAll('.cell').length).toBe(9);
    expect([...document.querySelectorAll('.cell')].filter((cell) => cell.textContent === '✕')).toHaveLength(1);
  });

  it('shows human win and increments win count', () => {
    const scriptedAi = (board) => {
      if (board[4] === null) return 4;
      if (board[5] === null) return 5;
      return null;
    };

    const game = createGameController({
      boardElement: document.getElementById('board'),
      statusElement: document.getElementById('status'),
      winCountElement: document.getElementById('win-count'),
      aiTimeElement: document.getElementById('ai-time'),
      restartButton: document.getElementById('restart'),
      getAiMove: scriptedAi,
    });

    game.init();
    document.querySelector('[data-index="0"]').click();
    document.querySelector('[data-index="1"]').click();
    document.querySelector('[data-index="2"]').click();

    expect(document.getElementById('status').textContent).toBe('あなたの勝ちです！');
    expect(document.getElementById('win-count').textContent).toBe('Win Count: 1');
    expect(document.querySelectorAll('.cell--winning')).toHaveLength(3);

    document.getElementById('restart').click();
    expect(document.getElementById('status').textContent).toBe('あなた (○) の手番です');
    expect([...document.querySelectorAll('.cell')].every((cell) => cell.textContent === '')).toBe(true);
  });
});
