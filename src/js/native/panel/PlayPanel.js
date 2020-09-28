import { prop } from "../../common/Utils.js";
import { sel } from "../Utils.js";
import SETTINGS from "../../common/SETTINGS.js";
import Game from "../../host/Game.js";
import Panel from "./Panel.js";
import TableMatrixRenderer from "../renderer/TableMatrixRenderer.js";
import Tetris from "../../domain/Tetris.js";

const PlayPanel = class extends Panel {
  #rootViewId = "intro_panel";
  #template = `
    <div id="${
      this.#rootViewId
    }" class="panel" style="width:100%; height:100%;">
      <table style="width:100%;height:100%;border:0px;border-spacing:0;border-collapse:collapse;"></table>
    </div>
  `;
  constructor() {
    super();
    prop(this, { base: null, tetris: null, renderer: null });
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
    // this.nextBlockRenderer = new TableMatrixRenderer
    this.boardRenderer = new TableMatrixRenderer(
      SETTINGS.PLAY.COL,
      SETTINGS.PLAY.ROW,
      sel(`#${this.#rootViewId} table`),
      "#000000"
    );

    this.tetris = new Tetris(SETTINGS.PLAY.COL, SETTINGS.PLAY.ROW, {
      start: () => {
        this.addEventListener();
        console.log("game start");
      },
      update: (
        boardMatrixData = null,
        nextBlockMatrixData = null,
        score = null,
        level = null
      ) => {
        // console.log(
        //   "update",
        //   boardMatrixData,
        //   nextBlockMatrixData,
        //   score,
        //   level
        // );
        if (boardMatrixData) {
          this.boardRenderer.render(boardMatrixData);
        }
      },
      end: () => {
        this.removeEventListener();
        console.log("game over");
      },
    });

    this.tetris.play();
  }
  onKeyDown(e) {
    const now = performance.now();
    let lastKeyIn = 0;
    if (now - lastKeyIn > SETTINGS.EVENT.KEY_INPUT_INTERVAL) {
      lastKeyIn = now;
      switch (e.keyCode) {
        case 37: // left arrow
          this.tetris.moveLeft();
          break;
        case 39: // right arrow
          this.tetris.moveRight();
          break;
        case 38: // up arrow
          this.tetris.rotate();
          break;
        case 40: // down arrow
          this.tetris.moveDown();
          break;
        case 32: // space
          this.tetris.moveBottom();
          break;
      }
    }
  }
};

export default PlayPanel;
