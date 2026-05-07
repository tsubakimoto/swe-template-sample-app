import { describe, expect, test } from "vitest";
import {
  applyMove,
  checkWinner,
  createInitialBoard,
  getAvailableMoves,
  getBestMove,
  getWinningLine
} from "../src/gameLogic.js";

describe("gameLogic", () => {
  test("createInitialBoard は空の9マスを返す", () => {
    expect(createInitialBoard()).toEqual(Array(9).fill(null));
  });

  test.each([
    [[0, 1, 2], "○"],
    [[3, 4, 5], "○"],
    [[6, 7, 8], "○"],
    [[0, 3, 6], "○"],
    [[1, 4, 7], "○"],
    [[2, 5, 8], "○"],
    [[0, 4, 8], "○"],
    [[2, 4, 6], "○"]
  ])("checkWinner は勝利パターン %j を判定する", (line, mark) => {
    const board = createInitialBoard();
    for (const index of line) {
      board[index] = mark;
    }
    expect(checkWinner(board)).toBe(mark);
  });

  test("getWinningLine は勝利ラインのインデックスを返す", () => {
    const board = ["○", "○", "○", null, null, null, null, null, null];
    expect(getWinningLine(board)).toEqual([0, 1, 2]);
  });

  test("checkWinner は引き分けを判定する", () => {
    const board = ["○", "✕", "○", "○", "✕", "✕", "✕", "○", "○"];
    expect(checkWinner(board)).toBe("draw");
  });

  test("getAvailableMoves は空きマスのみを返す", () => {
    const board = ["○", null, "✕", null, "○", null, "✕", null, null];
    expect(getAvailableMoves(board)).toEqual([1, 3, 5, 7, 8]);
  });

  test("applyMove は新しい盤面を返し、元の盤面を変更しない", () => {
    const board = createInitialBoard();
    const next = applyMove(board, 0, "○");
    expect(next[0]).toBe("○");
    expect(board[0]).toBeNull();
  });

  test("applyMove は無効手で例外を投げる", () => {
    const board = ["○", null, null, null, null, null, null, null, null];
    expect(() => applyMove(board, 0, "✕")).toThrow("invalid move");
    expect(() => applyMove(board, -1, "✕")).toThrow("invalid move");
    expect(() => applyMove(board, 9, "✕")).toThrow("invalid move");
  });

  test.each([
    {
      name: "AI が即勝ちを選ぶ",
      board: ["✕", "✕", null, "○", "○", null, null, null, null],
      expected: 2
    },
    {
      name: "Human の勝ちをブロックする",
      board: ["○", "○", null, null, "✕", null, null, null, null],
      expected: 2
    },
    {
      name: "代表局面で中央を優先する",
      board: ["○", null, null, null, null, null, null, null, null],
      expected: 4
    }
  ])("getBestMove: $name", ({ board, expected }) => {
    expect(getBestMove(board, "✕", "○")).toBe(expected);
  });

  test("getBestMove は終了局面で null を返す", () => {
    const board = ["○", "○", "○", "✕", "✕", null, null, null, null];
    expect(getBestMove(board, "✕", "○")).toBeNull();
  });

  test("getBestMove の思考時間は 500ms 以下", () => {
    const board = ["○", null, null, null, "✕", null, null, null, null];
    const start = performance.now();
    getBestMove(board, "✕", "○");
    const duration = performance.now() - start;
    expect(duration).toBeLessThanOrEqual(500);
  });
});
