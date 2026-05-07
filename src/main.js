import { createGameController } from "./controller.js";

const controller = createGameController({
  boardElement: document.getElementById("board"),
  statusElement: document.getElementById("status"),
  winCountElement: document.getElementById("win-count"),
  aiTimeElement: document.getElementById("ai-time"),
  restartButton: document.getElementById("restart")
});

controller.init();
