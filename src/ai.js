(function (globalScope) {
  const game =
    globalScope.TicTacToeGame ||
    (typeof require === "function" ? require("./game") : null);

  function now() {
    if (typeof performance !== "undefined" && typeof performance.now === "function") {
      return performance.now();
    }
    return Date.now();
  }

  function minimax(board, currentPlayer, aiPlayer, humanPlayer, depth) {
    const winner = game.getWinner(board);

    if (winner === aiPlayer) {
      return 10 - depth;
    }
    if (winner === humanPlayer) {
      return depth - 10;
    }
    if (game.getAvailableMoves(board).length === 0) {
      return 0;
    }

    if (currentPlayer === aiPlayer) {
      let bestScore = -Infinity;
      for (const move of game.getAvailableMoves(board)) {
        const nextBoard = board.slice();
        nextBoard[move] = currentPlayer;
        const score = minimax(nextBoard, humanPlayer, aiPlayer, humanPlayer, depth + 1);
        bestScore = Math.max(bestScore, score);
      }
      return bestScore;
    }

    let bestScore = Infinity;
    for (const move of game.getAvailableMoves(board)) {
      const nextBoard = board.slice();
      nextBoard[move] = currentPlayer;
      const score = minimax(nextBoard, aiPlayer, aiPlayer, humanPlayer, depth + 1);
      bestScore = Math.min(bestScore, score);
    }
    return bestScore;
  }

  function findBestMove(board, aiPlayer, humanPlayer) {
    if (game.isGameOver(board)) {
      return -1;
    }

    let bestMove = -1;
    let bestScore = -Infinity;

    for (const move of game.getAvailableMoves(board)) {
      const nextBoard = board.slice();
      nextBoard[move] = aiPlayer;
      const score = minimax(nextBoard, humanPlayer, aiPlayer, humanPlayer, 0);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  function chooseAiMove(board, aiPlayer = "X", humanPlayer = "O") {
    const start = now();
    const move = findBestMove(board, aiPlayer, humanPlayer);
    const durationMs = now() - start;

    return { move, durationMs };
  }

  const api = {
    minimax,
    findBestMove,
    chooseAiMove
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  globalScope.TicTacToeAI = api;
})(typeof window !== "undefined" ? window : globalThis);
