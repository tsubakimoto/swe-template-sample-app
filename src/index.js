document.addEventListener("DOMContentLoaded", function () {
  if (window.TicTacToeUI && typeof window.TicTacToeUI.init === "function") {
    window.TicTacToeUI.init();
  }
});
