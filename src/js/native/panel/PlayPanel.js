import { prop } from "../../common/Utils.js";
import { sel } from "../Utils.js";
import Game from "../../Game.js";
import Panel from "./Panel.js";
import TableMatrixRenderer from "../renderer/TableMatrixRenderer.js";

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
    window.removeEventListener("keydown", this.onKeyDown);
  }
  _destroyed() {}
  initBindEventListener() {
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  play() {
    this.playRenderer = new TableMatrixRenderer(
      this._game.col,
      this._game.row,
      sel(`#${this.#rootViewId} table`),
      "#000000"
    );

    window.addEventListener("keydown", this.onKeyDown);

    this._game.playTetris({
      [Game.EVENTS.TETRIS_PLAY_MOVED_BLOCK]: (matrixData) => {
        this.playRenderer.render(matrixData);
      },
      [Game.EVENTS.TETRIS_PLAY_REMOVED_LINE]: (matrixData) => {
        this.playRenderer.render(matrixData);
      },
      [Game.EVENTS.TETRIS_PLAY_ADJUSTED_LINE]: (matrixData) => {
        this.playRenderer.render(matrixData);
      },
      [Game.EVENTS.TETRIS_PLAY_GAME_OVER]: () => {
        if (window.confirm("Game Over")) {
          this._game.setState(Game.gameOver);
        }
      },
    });
  }
  onKeyDown(e) {
    const now = performance.now();
    let lastKeyIn = 0;
    if (now - lastKeyIn > 100) {
      lastKeyIn = now;
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 37: // left arrow
          this._game.requestLeftMoveBlock();
          break;
        case 39: // right arrow
          this._game.requestRightMoveBlock();
          break;
        case 38: // up arrow
          this._game.requestRotateBlock();
          break;
        case 40: // down arrow
          this._game.requestDownMoveBlock();
          break;
        case 32: // space arrow
          this._game.requestDownMoveToBottomBlock();
          break;
      }
    }
  }
};

export default PlayPanel;
