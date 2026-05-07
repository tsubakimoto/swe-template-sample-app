export function createGameUI({
  boardElement,
  statusElement,
  winCountElement,
  aiTimeElement,
  restartButton,
  onCellSelect,
  onRestart
}) {
  const cells = Array.from({ length: 9 }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cell";
    button.dataset.index = String(index);
    button.setAttribute("aria-label", `マス ${index + 1}`);
    button.addEventListener("click", () => onCellSelect(index));
    boardElement.appendChild(button);
    return button;
  });

  restartButton.addEventListener("click", onRestart);

  function render({ board, gameOver, status, winCount, aiThinkingTimeText, winningLine, winner }) {
    const winningSet = new Set(winningLine ?? []);
    cells.forEach((cell, index) => {
      const value = board[index];
      cell.textContent = value ?? "";
      cell.disabled = gameOver || value !== null;
      cell.classList.toggle("cell--filled", value !== null);
      cell.classList.toggle("cell--winning", winningSet.has(index));
      cell.setAttribute(
        "aria-label",
        value ? `マス ${index + 1}: ${value}` : `マス ${index + 1}: 空`
      );
    });
    boardElement.classList.toggle("board--won", Boolean(winningLine));
    boardElement.classList.toggle("board--won-human", winner === "○");
    boardElement.classList.toggle("board--won-ai", winner === "✕");
    statusElement.textContent = status;
    if (winCountElement) {
      winCountElement.textContent = `Win Count: ${winCount}`;
    }
    if (aiTimeElement) {
      aiTimeElement.textContent = aiThinkingTimeText;
    }
  }

  return { render };
}
