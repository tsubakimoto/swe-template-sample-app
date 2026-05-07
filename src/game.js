(function (globalScope) {
  const WIN_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function createGameState() {
    return {
      board: Array(9).fill(null),
      currentPlayer: "O",
      winner: null,
      isDraw: false,
      isGameOver: false
    };
  }

  function getWinner(board) {
    for (const [a, b, c] of WIN_LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function getAvailableMoves(board) {
    const moves = [];
    for (let i = 0; i < board.length; i += 1) {
      if (!board[i]) {
        moves.push(i);
      }
    }
    return moves;
  }

  function isDraw(board) {
    return getWinner(board) === null && getAvailableMoves(board).length === 0;
  }

  function isGameOver(board) {
    return getWinner(board) !== null || getAvailableMoves(board).length === 0;
  }

  function makeMove(state, index) {
    if (!Number.isInteger(index) || index < 0 || index > 8) {
      return { state, moved: false };
    }

    if (state.isGameOver || state.board[index]) {
      return { state, moved: false };
    }

    const board = state.board.slice();
    board[index] = state.currentPlayer;

    const winner = getWinner(board);
    const draw = winner === null && getAvailableMoves(board).length === 0;
    const gameOver = Boolean(winner || draw);

    return {
      state: {
        board,
        currentPlayer: gameOver ? state.currentPlayer : state.currentPlayer === "O" ? "X" : "O",
        winner,
        isDraw: draw,
        isGameOver: gameOver
      },
      moved: true
    };
  }

  function resetGame() {
    return createGameState();
  }

  const api = {
    WIN_LINES,
    createGameState,
    getWinner,
    getAvailableMoves,
    isDraw,
    isGameOver,
    makeMove,
    resetGame
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  globalScope.TicTacToeGame = api;
})(typeof window !== "undefined" ? window : globalThis);
