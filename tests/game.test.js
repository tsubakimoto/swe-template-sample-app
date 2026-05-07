import { describe, expect, it } from 'vitest';
import {
  applyMove,
  createEmptyBoard,
  getAvailableMoves,
  getOutcome,
  getWinningLine,
} from '../src/game.js';

describe('game logic', () => {
  it('creates an empty 3x3 board', () => {
    expect(createEmptyBoard()).toEqual(Array(9).fill(null));
  });

  it('applies valid move without mutating original board', () => {
    const board = createEmptyBoard();
    const next = applyMove(board, 3, '○');
    expect(board[3]).toBeNull();
    expect(next[3]).toBe('○');
  });

  it('throws on invalid move', () => {
    const board = createEmptyBoard();
    expect(() => applyMove(board, -1, '○')).toThrow('invalid move');
    const occupied = applyMove(board, 0, '○');
    expect(() => applyMove(occupied, 0, '✕')).toThrow('invalid move');
  });

  it('returns available moves', () => {
    const board = ['○', null, '✕', null, null, null, '○', null, '✕'];
    expect(getAvailableMoves(board)).toEqual([1, 3, 4, 5, 7]);
  });

  it('detects win, draw and ongoing game', () => {
    expect(getOutcome(['○', '○', '○', null, '✕', null, null, '✕', null])).toBe('○');
    expect(getOutcome(['○', '✕', '○', '○', '✕', '✕', '✕', '○', '○'])).toBe('draw');
    expect(getOutcome(createEmptyBoard())).toBeNull();
  });

  it('returns winning line indexes', () => {
    expect(getWinningLine(['✕', null, null, '✕', null, null, '✕', '○', '○'])).toEqual([0, 3, 6]);
    expect(getWinningLine(['✕', '○', '✕', '○', '✕', '○', '○', '✕', '○'])).toBeNull();
  });
});
