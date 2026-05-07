const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function createInitialBoard() {
  return Array(9).fill(null);
}

export function getAvailableMoves(board) {
  return board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);
}

export function checkWinner(board) {
  const winningLine = getWinningLine(board);
  if (winningLine) {
    return board[winningLine[0]];
  }

  if (board.every((cell) => cell !== null)) {
    return "draw";
  }

  return null;
}

export function getWinningLine(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c];
    }
  }
  return null;
}

export function applyMove(board, position, player) {
  if (position < 0 || position > 8 || board[position] !== null) {
    throw new Error("invalid move");
  }

  const nextBoard = [...board];
  nextBoard[position] = player;
  return nextBoard;
}

function minimax(board, currentPlayer, aiPlayer, humanPlayer, depth = 0) {
  const result = checkWinner(board);
  if (result === aiPlayer) {
    return { score: 10 - depth };
  }
  if (result === humanPlayer) {
    return { score: depth - 10 };
  }
  if (result === "draw") {
    return { score: 0 };
  }

  const availableMoves = getAvailableMoves(board);
  const isMaximizing = currentPlayer === aiPlayer;
  let best = {
    score: isMaximizing ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
    move: null
  };

  for (const move of availableMoves) {
    const nextBoard = applyMove(board, move, currentPlayer);
    const nextPlayer = currentPlayer === aiPlayer ? humanPlayer : aiPlayer;
    const { score } = minimax(nextBoard, nextPlayer, aiPlayer, humanPlayer, depth + 1);

    if (isMaximizing && score > best.score) {
      best = { score, move };
    } else if (!isMaximizing && score < best.score) {
      best = { score, move };
    }
  }

  return best;
}

export function getBestMove(board, aiPlayer = "✕", humanPlayer = "○") {
  if (checkWinner(board)) {
    return null;
  }

  return minimax(board, aiPlayer, aiPlayer, humanPlayer).move;
}
