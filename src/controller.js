import {
  applyMove,
  checkWinner,
  createInitialBoard,
  getBestMove,
  getWinningLine
} from "./gameLogic.js";
import { createGameUI } from "./ui.js";

export function createGameController({
  boardElement,
  statusElement,
  winCountElement,
  aiTimeElement,
  restartButton,
  getAiMove = getBestMove,
  now = () => performance.now()
}) {
  const humanPlayer = "○";
  const aiPlayer = "✕";
  let board = createInitialBoard();
  let gameOver = false;
  let winCount = 0;
  let lastAiThinkingTime = null;
  let winningLine = null;

  const ui = createGameUI({
    boardElement,
    statusElement,
    winCountElement,
    aiTimeElement,
    restartButton,
    onCellSelect: handleHumanMove,
    onRestart: reset
  });

  function getStatusMessage(result) {
    if (result === humanPlayer) {
      return "あなたの勝ちです！";
    }
    if (result === aiPlayer) {
      return "AI の勝ちです。";
    }
    if (result === "draw") {
      return "引き分けです。";
    }
    return "あなた (○) の手番です";
  }

  function getAiTimeMessage() {
    if (lastAiThinkingTime === null) {
      return "AI 思考時間: -";
    }
    const threshold = 500;
    const verdict = lastAiThinkingTime <= threshold ? "OK" : "NG";
    return `AI 思考時間: ${lastAiThinkingTime.toFixed(2)}ms (${verdict}: <= ${threshold}ms)`;
  }

  function render(result = null) {
    ui.render({
      board,
      gameOver,
      status: getStatusMessage(result),
      winCount,
      aiThinkingTimeText: getAiTimeMessage(),
      winningLine,
      winner: result
    });
  }

  function endIfFinished() {
    const result = checkWinner(board);
    if (!result) {
      return false;
    }
    if (result === humanPlayer) {
      winCount += 1;
      winningLine = getWinningLine(board);
    } else if (result === aiPlayer) {
      winCount = 0;
      winningLine = getWinningLine(board);
    } else {
      winningLine = null;
    }
    gameOver = true;
    render(result);
    return true;
  }

  function handleAiMove() {
    const startedAt = now();
    const move = getAiMove(board, aiPlayer, humanPlayer);
    lastAiThinkingTime = now() - startedAt;
    if (move === null) {
      return false;
    }
    board = applyMove(board, move, aiPlayer);
    return endIfFinished();
  }

  function handleHumanMove(index) {
    if (gameOver || board[index] !== null) {
      return;
    }

    board = applyMove(board, index, humanPlayer);
    if (endIfFinished()) {
      return;
    }

    const aiFinished = handleAiMove();
    if (!aiFinished) {
      render();
    }
  }

  function reset() {
    board = createInitialBoard();
    gameOver = false;
    lastAiThinkingTime = null;
    winningLine = null;
    render();
  }

  function init() {
    render();
  }

  return {
    init,
    reset
  };
}
