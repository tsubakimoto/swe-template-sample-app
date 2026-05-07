import { getBestMove } from './ai.js';
import { applyMove, createEmptyBoard, getOutcome, getWinningLine } from './game.js';
import { createUI } from './ui.js';
import './style.css';

export function createGameController({
  boardElement,
  statusElement,
  winCountElement,
  aiTimeElement,
  restartButton,
  getAiMove = getBestMove,
  now = () => performance.now(),
}) {
  const HUMAN = '○';
  const AI = '✕';
  const AI_TIME_THRESHOLD_MS = 500;

  let board = createEmptyBoard();
  let gameOver = false;
  let winCount = 0;
  let aiThinkingTime = null;
  let winningLine = null;

  const ui = createUI({
    boardElement,
    statusElement,
    winCountElement,
    aiTimeElement,
    restartButton,
    onCellSelect: handleHumanMove,
    onRestart: reset,
  });

  function getStatusText(result) {
    if (result === HUMAN) return 'あなたの勝ちです！';
    if (result === AI) return 'AI の勝ちです。';
    if (result === 'draw') return '引き分けです。';
    return 'あなた (○) の手番です';
  }

  function getAiThinkingTimeText() {
    if (aiThinkingTime === null) return 'AI 思考時間: -';
    const evaluation = aiThinkingTime <= AI_TIME_THRESHOLD_MS ? 'OK' : 'NG';
    return `AI 思考時間: ${aiThinkingTime.toFixed(2)}ms (${evaluation}: <= ${AI_TIME_THRESHOLD_MS}ms)`;
  }

  function render(result = null) {
    ui.render({
      board,
      gameOver,
      status: getStatusText(result),
      winCount,
      aiThinkingTimeText: getAiThinkingTimeText(),
      winningLine,
      winner: result,
    });
  }

  function settleGameIfFinished() {
    const result = getOutcome(board);
    if (!result) return false;

    if (result === HUMAN) {
      winCount += 1;
      winningLine = getWinningLine(board);
    } else if (result === AI) {
      winCount = 0;
      winningLine = getWinningLine(board);
    } else {
      winningLine = null;
    }
    gameOver = true;
    render(result);
    return true;
  }

  function playAiMove() {
    const started = now();
    const move = getAiMove(board, AI, HUMAN);
    aiThinkingTime = now() - started;
    if (move === null) {
      return false;
    }
    board = applyMove(board, move, AI);
    return settleGameIfFinished();
  }

  function handleHumanMove(index) {
    if (gameOver || board[index] !== null) {
      return;
    }

    board = applyMove(board, index, HUMAN);
    if (settleGameIfFinished()) {
      return;
    }

    if (!playAiMove()) {
      render();
    }
  }

  function reset() {
    board = createEmptyBoard();
    gameOver = false;
    aiThinkingTime = null;
    winningLine = null;
    render();
  }

  function init() {
    render();
  }

  return { init, reset };
}

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const winCountElement = document.getElementById('win-count');
const aiTimeElement = document.getElementById('ai-time');
const restartButton = document.getElementById('restart');

if (boardElement && statusElement && restartButton) {
  const game = createGameController({
    boardElement,
    statusElement,
    winCountElement,
    aiTimeElement,
    restartButton,
  });
  game.init();
}
