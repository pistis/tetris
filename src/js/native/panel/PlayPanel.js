import { prop } from "../../common/Utils.js";
import { sel } from "../Utils.js";
import SETTINGS from "../../common/SETTINGS.js";
import Panel from "./Panel.js";
import TableMatrixRenderer from "../renderer/TableMatrixRenderer.js";
import RankingGame from "../../host/RankingGame.js";

const PlayPanel = class extends Panel {
  #rootViewId = "play_panel";
  #template = `
    <div id="${
      this.#rootViewId
    }" class="panel" style="width:100%; height:100%;">
        <table class="block"></table>
        <div style="position:absolute;left: 450px; top: 200px; width: 100px;">
            <div>score: <span class="score"></span></div>
            <div>stage: <span class="stage"></span></div>
            <div>lines: <span class="lines"></span></div>
        </div>
        <table class="board" style="width:100%;height:100%;border:0px;border-spacing:0;border-collapse:collapse;"></table>
    </div>
  `;
  constructor() {
    super();
    prop(this, { base: null, rankingGame: null, renderer: null });
  }
  _render() {
    return this.#template;
  }
  _created() {
    this.base = sel(`#${this.#rootViewId}`);
    this.initBindEventListener();
    this.play();
  }
  _beforeDestroyed() {
    this.removeEventListener();
  }
  _destroyed() {}
  initBindEventListener() {
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  addEventListener() {
    window.addEventListener("keydown", this.onKeyDown);
  }
  removeEventListener() {
    window.removeEventListener("keydown", this.onKeyDown);
  }
  play() {
    this.boardRenderer = new TableMatrixRenderer(
      SETTINGS.BOARD.COL,
      SETTINGS.BOARD.ROW,
      sel(`#${this.#rootViewId} table.board`),
      "#000000"
    );

    const nextBlockBoardEl = sel(`#${this.#rootViewId} table.block`);

    this.rankingGame = new RankingGame(SETTINGS.BOARD.ROW, SETTINGS.BOARD.COL, {
      start: () => {
        this.addEventListener();
        console.log("game start");
      },
      // TODO : 전달받는 데이터별로 update를 만드는게 좋을까?
      update: (
        boardMatrixData = null,
        nextBlockMatrixData = null,
        score = null,
        stage = null,
        lines = null
      ) => {
        if (boardMatrixData) {
          this.boardRenderer.render(boardMatrixData);
        }
        if (nextBlockMatrixData) {
          const col = nextBlockMatrixData[0].length;
          const row = nextBlockMatrixData.length;
          nextBlockBoardEl.innerHTML = "";
          nextBlockBoardEl.style.cssText = `position:absolute;left:450px;border:1px solid black;width:${
            col * 40
          }px;height:${row * 40}px`;
          const nextBlockRenderer = new TableMatrixRenderer(
            col,
            row,
            nextBlockBoardEl,
            "#000000"
          );
          nextBlockRenderer.render(nextBlockMatrixData);
        }
        if (score) {
          sel(`#${this.#rootViewId} span.score`).innerText = score;
        }
        if (stage) {
          sel(`#${this.#rootViewId} span.stage`).innerText = stage;
        }
        if (lines) {
          sel(`#${this.#rootViewId} span.lines`).innerText = lines;
        }
      },
      end: () => {
        this.removeEventListener();
        console.log("game over");
      },
    });

    this.rankingGame.play();
  }
  onKeyDown(e) {
    const now = performance.now();
    let lastKeyIn = 0;
    if (now - lastKeyIn > SETTINGS.EVENT.KEY_INPUT_INTERVAL) {
      lastKeyIn = now;
      switch (e.keyCode) {
        case 37: // left arrow
          this.rankingGame.moveLeft();
          break;
        case 39: // right arrow
          this.rankingGame.moveRight();
          break;
        case 38: // up arrow
          this.rankingGame.rotate();
          break;
        case 40: // down arrow
          this.rankingGame.moveDown();
          break;
        case 32: // space
          this.rankingGame.moveBottom();
          break;
      }
    }
  }
};

export default PlayPanel;
