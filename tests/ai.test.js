import { describe, expect, it } from 'vitest';
import { getBestMove } from '../src/ai.js';

describe('minimax ai', () => {
  it('chooses immediate winning move', () => {
    const board = ['✕', '✕', null, '○', '○', null, null, null, null];
    expect(getBestMove(board, '✕', '○')).toBe(2);
  });

  it('blocks opponent immediate winning move', () => {
    const board = ['○', '○', null, '✕', null, null, null, '✕', null];
    expect(getBestMove(board, '✕', '○')).toBe(2);
  });

  it('returns null on finished game', () => {
    expect(getBestMove(['✕', '✕', '✕', '○', '○', null, null, null, null], '✕', '○')).toBeNull();
    expect(getBestMove(['○', '✕', '○', '○', '✕', '✕', '✕', '○', '○'], '✕', '○')).toBeNull();
  });
});
