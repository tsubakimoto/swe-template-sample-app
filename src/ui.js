(function (globalScope) {
  const game = globalScope.TicTacToeGame;
  const ai = globalScope.TicTacToeAI;

  function init() {
    const boardElement = document.getElementById("board");
    const statusElement = document.getElementById("status");
    const winCountElement = document.getElementById("win-count");
    const aiTimeElement = document.getElementById("ai-time");
    const resetButton = document.getElementById("reset");

    if (!boardElement || !statusElement || !winCountElement || !resetButton || !game || !ai) {
      return;
    }

    let state = game.createGameState();
    let winCount = 0;
    let resultApplied = false;
    let pendingAiTimeout = null;

    function updateStatusText() {
      if (state.isGameOver) {
        if (state.winner === "O") {
          return "あなたの勝ちです";
        }
        if (state.winner === "X") {
          return "AI の勝ちです";
        }
        return "引き分けです";
      }

      return state.currentPlayer === "O" ? "あなたのターン (O)" : "AI のターン (X)";
    }

    function applyResultIfNeeded() {
      if (!state.isGameOver || resultApplied) {
        return;
      }

      if (state.winner === "O") {
        winCount += 1;
      }

      if (state.winner === "X") {
        winCount = 0;
      }

      resultApplied = true;
    }

    function renderBoard() {
      boardElement.innerHTML = "";

      for (let index = 0; index < 9; index += 1) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "cell";
        cell.textContent = state.board[index] || "";
        cell.setAttribute("aria-label", `cell ${index + 1}`);

        const disabled = Boolean(state.board[index]) || state.isGameOver || state.currentPlayer !== "O";
        cell.disabled = disabled;

        cell.addEventListener("click", function () {
          handleHumanMove(index);
        });

        boardElement.appendChild(cell);
      }
    }

    function render() {
      applyResultIfNeeded();
      renderBoard();
      statusElement.textContent = updateStatusText();
      winCountElement.textContent = `Win Count: ${winCount}`;
    }

    function handleAiMove() {
      pendingAiTimeout = null;

      const decision = ai.chooseAiMove(state.board, "X", "O");
      const next = game.makeMove(state, decision.move);

      if (next.moved) {
        state = next.state;
      }

      if (aiTimeElement) {
        aiTimeElement.textContent = `AI Think: ${decision.durationMs.toFixed(1)}ms`;
      }

      render();
    }

    function handleHumanMove(index) {
      const next = game.makeMove(state, index);

      if (!next.moved) {
        return;
      }

      state = next.state;
      render();

      if (!state.isGameOver && state.currentPlayer === "X") {
        pendingAiTimeout = window.setTimeout(handleAiMove, 120);
      }
    }

    function resetGame() {
      if (pendingAiTimeout !== null) {
        window.clearTimeout(pendingAiTimeout);
        pendingAiTimeout = null;
      }

      state = game.resetGame();
      resultApplied = false;
      if (aiTimeElement) {
        aiTimeElement.textContent = "AI Think: -";
      }
      render();
    }

    resetButton.addEventListener("click", resetGame);
    render();
  }

  const api = { init };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  globalScope.TicTacToeUI = api;
})(typeof window !== "undefined" ? window : globalThis);
