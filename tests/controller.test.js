import { describe, expect, test } from "vitest";
import { createGameController } from "../src/controller.js";

function setupDom() {
  document.body.innerHTML = `
    <main>
      <p id="status" aria-live="polite"></p>
      <p id="win-count"></p>
      <p id="ai-time"></p>
      <div id="board"></div>
      <button id="restart">もう一度遊ぶ</button>
    </main>
  `;
}

function setupController(options = {}) {
  setupDom();
  const controller = createGameController({
    boardElement: document.getElementById("board"),
    statusElement: document.getElementById("status"),
    winCountElement: document.getElementById("win-count"),
    aiTimeElement: document.getElementById("ai-time"),
    restartButton: document.getElementById("restart"),
    ...options
  });
  controller.init();
  return controller;
}

function clickCell(index) {
  document.querySelector(`#board button[data-index='${index}']`)?.click();
}

describe("controller/ui", () => {
  test("初期化時に9つのボタンを描画する", () => {
    setupController();
    expect(document.querySelectorAll("#board button")).toHaveLength(9);
    expect(document.getElementById("win-count").textContent).toContain("0");
  });

  test("Human=○ / AI=✕ の記号で進行する", () => {
    setupController({ getAiMove: () => 1 });
    clickCell(0);

    const marks = [...document.querySelectorAll("#board button")].map((b) => b.textContent?.trim());
    expect(marks[0]).toBe("○");
    expect(marks[1]).toBe("✕");
  });

  test("引き分けを表示できる", () => {
    let turn = 0;
    const aiMoves = [1, 5, 6, 8];
    setupController({
      getAiMove: () => aiMoves[turn++]
    });

    [0, 2, 3, 7, 4].forEach(clickCell);
    expect(document.getElementById("status").textContent).toContain("引き分け");
  });

  test("無効手（同じマスの再クリック）は無視される", () => {
    setupController({ getAiMove: () => 4 });
    clickCell(0);
    clickCell(0);

    const marks = [...document.querySelectorAll("#board button")].map((b) => b.textContent);
    expect(marks.filter((v) => v === "○")).toHaveLength(1);
    expect(marks.filter((v) => v === "✕")).toHaveLength(1);
  });

  test("ゲーム終了後は操作できない", () => {
    setupController({ getAiMove: () => null });
    clickCell(0);
    clickCell(1);
    clickCell(2);
    clickCell(3);

    const marks = [...document.querySelectorAll("#board button")].map((b) => b.textContent);
    expect(document.getElementById("status").textContent).toContain("勝ち");
    expect(marks[3]).toBe("");
  });

  test("Human 勝利で Win Count が増える", () => {
    setupController({ getAiMove: () => null });
    clickCell(0);
    clickCell(1);
    clickCell(2);
    expect(document.getElementById("win-count").textContent).toContain("1");
    expect(document.querySelector("#board")?.classList.contains("board--won")).toBe(true);
    expect(document.querySelector("#board")?.classList.contains("board--won-human")).toBe(true);
    expect(document.querySelectorAll(".cell--winning")).toHaveLength(3);
  });

  test("Human 敗北で Win Count が 0 にリセットされる", () => {
    let losingGame = false;
    const aiMoves = [0, 1, 2];
    let turn = 0;
    setupController({
      getAiMove: () => (losingGame ? aiMoves[turn++] : null)
    });
    clickCell(0);
    clickCell(1);
    clickCell(2);
    expect(document.getElementById("win-count").textContent).toContain("1");

    losingGame = true;
    document.getElementById("restart").click();
    clickCell(3);
    clickCell(4);
    clickCell(8);
    expect(document.getElementById("status").textContent).toContain("AI");
    expect(document.getElementById("win-count").textContent).toContain("0");
  });

  test("AI 思考時間を表示し、500ms 以下判定を表示する", () => {
    let now = 1000;
    setupController({
      getAiMove: () => 4,
      now: () => {
        now += 120;
        return now;
      }
    });

    clickCell(0);
    expect(document.getElementById("ai-time").textContent).toContain("120.00ms");
    expect(document.getElementById("ai-time").textContent).toContain("OK");
  });
});
