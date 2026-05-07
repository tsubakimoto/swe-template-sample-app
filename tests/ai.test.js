const game = require("../src/game");
const ai = require("../src/ai");

function randomChoice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

describe("ai logic", function () {
  test("勝てる手があるときは勝ちに行く", function () {
    const board = ["X", "X", null, "O", "O", null, null, null, null];
    expect(ai.findBestMove(board, "X", "O")).toBe(2);
  });

  test("相手の勝ち筋をブロックする", function () {
    const board = ["O", "O", null, null, "X", null, null, null, null];
    expect(ai.findBestMove(board, "X", "O")).toBe(2);
  });

  test("ゲーム終了状態では手を返さない", function () {
    const board = ["O", "O", "O", null, "X", null, null, null, "X"];
    expect(ai.findBestMove(board, "X", "O")).toBe(-1);
  });

  test("chooseAiMove は move と durationMs を返す", function () {
    const board = ["X", "X", null, "O", "O", null, null, null, null];
    const decision = ai.chooseAiMove(board, "X", "O");

    expect(decision.move).toBe(2);
    expect(typeof decision.durationMs).toBe("number");
    expect(decision.durationMs).toBeGreaterThanOrEqual(0);
  });

  test("chooseAiMove はデフォルト引数を使える", function () {
    const board = ["X", "X", null, "O", "O", null, null, null, null];
    const decision = ai.chooseAiMove(board);

    expect(decision.move).toBe(2);
    expect(typeof decision.durationMs).toBe("number");
  });

  test("ランダムな相手に対して AI が負けない", function () {
    for (let i = 0; i < 20; i += 1) {
      let state = game.createGameState();

      while (!state.isGameOver) {
        if (state.currentPlayer === "O") {
          const moves = game.getAvailableMoves(state.board);
          const move = randomChoice(moves);
          state = game.makeMove(state, move).state;
        } else {
          const move = ai.findBestMove(state.board, "X", "O");
          state = game.makeMove(state, move).state;
        }
      }

      expect(state.winner).not.toBe("O");
    }
  });
});
