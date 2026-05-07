const game = require("../src/game");

describe("game logic", function () {
  test("初期状態を作成できる", function () {
    const state = game.createGameState();

    expect(state.board).toEqual([null, null, null, null, null, null, null, null, null]);
    expect(state.currentPlayer).toBe("O");
    expect(state.isGameOver).toBe(false);
  });

  test("有効な手を打つとプレイヤーが交代する", function () {
    const current = game.createGameState();
    const result = game.makeMove(current, 0);

    expect(result.moved).toBe(true);
    expect(result.state.board[0]).toBe("O");
    expect(result.state.currentPlayer).toBe("X");
  });

  test("無効な手は無視される", function () {
    const first = game.makeMove(game.createGameState(), 0).state;
    const second = game.makeMove(first, 0);

    expect(second.moved).toBe(false);
    expect(second.state).toBe(first);
  });

  test("範囲外インデックスの手は無視される", function () {
    const current = game.createGameState();

    expect(game.makeMove(current, -1).moved).toBe(false);
    expect(game.makeMove(current, 9).moved).toBe(false);
  });

  test("勝者を判定できる", function () {
    const winner = game.getWinner(["O", "O", "O", null, null, null, null, null, null]);
    expect(winner).toBe("O");
  });

  test("引き分けを判定できる", function () {
    const board = ["O", "X", "O", "O", "X", "X", "X", "O", "O"];
    expect(game.isDraw(board)).toBe(true);
    expect(game.getWinner(board)).toBe(null);
  });

  test("ゲーム終了状態を判定できる", function () {
    expect(game.isGameOver(["O", "O", "O", null, null, null, null, null, null])).toBe(true);
    expect(game.isGameOver(["O", "X", "O", "O", "X", "X", "X", "O", "O"])).toBe(true);
    expect(game.isGameOver(["O", null, null, null, null, null, null, null, null])).toBe(false);
  });

  test("利用可能な手の一覧を取得できる", function () {
    const board = ["O", null, "X", null, null, "O", "X", null, null];
    expect(game.getAvailableMoves(board)).toEqual([1, 3, 4, 7, 8]);
  });

  test("ゲーム終了後は手を打てない", function () {
    const finished = {
      board: ["O", "O", "O", "X", "X", null, null, null, null],
      currentPlayer: "X",
      winner: "O",
      isDraw: false,
      isGameOver: true
    };
    const result = game.makeMove(finished, 5);

    expect(result.moved).toBe(false);
    expect(result.state).toBe(finished);
  });

  test("リセットで初期状態に戻る", function () {
    const initial = game.resetGame();
    expect(initial).toEqual(game.createGameState());
  });
});
