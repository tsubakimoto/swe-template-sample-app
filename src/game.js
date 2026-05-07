export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function createEmptyBoard() {
  return Array(9).fill(null);
}

export function getAvailableMoves(board) {
  return board.map((cell, index) => (cell === null ? index : null)).filter((index) => index !== null);
}

export function getWinningLine(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c];
    }
  }
  return null;
}

export function getOutcome(board) {
  const winningLine = getWinningLine(board);
  if (winningLine) {
    return board[winningLine[0]];
  }
  if (board.every((cell) => cell !== null)) {
    return 'draw';
  }
  return null;
}

export function applyMove(board, index, player) {
  if (index < 0 || index > 8 || board[index] !== null) {
    throw new Error('invalid move');
  }
  const next = [...board];
  next[index] = player;
  return next;
}
