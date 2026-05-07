import { applyMove, getAvailableMoves, getOutcome } from './game.js';

function minimax(board, currentPlayer, aiPlayer, humanPlayer, depth = 0) {
  const outcome = getOutcome(board);
  if (outcome === aiPlayer) return { score: 10 - depth };
  if (outcome === humanPlayer) return { score: depth - 10 };
  if (outcome === 'draw') return { score: 0 };

  const availableMoves = getAvailableMoves(board);
  const isAiTurn = currentPlayer === aiPlayer;
  let bestResult = {
    score: isAiTurn ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
    move: null,
  };

  for (const move of availableMoves) {
    const nextBoard = applyMove(board, move, currentPlayer);
    const nextPlayer = currentPlayer === aiPlayer ? humanPlayer : aiPlayer;
    const result = minimax(nextBoard, nextPlayer, aiPlayer, humanPlayer, depth + 1);

    if (isAiTurn && result.score > bestResult.score) {
      bestResult = { score: result.score, move };
    }
    if (!isAiTurn && result.score < bestResult.score) {
      bestResult = { score: result.score, move };
    }
  }

  return bestResult;
}

export function getBestMove(board, aiPlayer = '✕', humanPlayer = '○') {
  if (getOutcome(board)) {
    return null;
  }
  return minimax(board, aiPlayer, aiPlayer, humanPlayer).move;
}
