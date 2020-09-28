import { prop, err } from "./Utils.js";
import { inner } from "./native/Utils.js";
import Tetris from "./domain/Tetris.js";

const stateDefinition = "title,intro,play,gameOver"
  .split(",")
  .reduce((acc, cur) => {
    acc[cur] = Symbol();
    return acc;
  }, {});

const Game = class {
  static EVENTS = {
    TETRIS_PLAY_MOVED_BLOCK: Symbol(),
    TETRIS_PLAY_REMOVED_LINE: Symbol(),
    TETRIS_PLAY_ADJUSTED_LINE: Symbol(),
    TETRIS_PLAY_GAME_OVER: Symbol(),
  };
  constructor(base, col, row) {
    prop(this, {
      base,
      col,
      row,
      panels: {},
      curr: null,
      tetris: null,
      stage: null,
      score: null,
    });
  }

  addPanel(state, panel) {
    if (!Object.values(stateDefinition).includes(state))
      err("invalid game state");
    panel.game = this;
    this.panels[state] = panel;
  }

  initializeState() {
    const {
      panels: { [this.curr]: panel },
    } = this;
    inner(this.base, panel.render());
    panel.created();
  }
  cleanupState() {
    if (this.curr) {
      this.panels[this.curr].beforeDestroyed();
      this.panels[this.curr].destroyed();
    }
  }
  setState(state) {
    if (!Object.values(stateDefinition).includes(state))
      err("invalid game state");
    this.cleanupState();

    this.curr = state;
    this.initializeState();
  }
  // eventListener의 처리 방법 리팩토링 필요(Tetris가 알 필요가 있나? 너무 장황하다.)
  playTetris(eventsListener) {
    this.eventsListener = eventsListener;
    this.tetris = new Tetris(this.col, this.row);
    // this.tetris.on("changed", (matrixData) => {
    //   eventsListener[Game.EVENTS.TETRIS_PLAY_MOVED_BLOCK](matrixData);
    // });
    this.tetris.play(eventsListener);
  }
  requestLeftMoveBlock() {
    if (!this.tetris) {
      return;
    }
    if (this.tetris.allowMove(-1, 0)) {
      this.tetris.move(-1, 0);
    }
  }
  requestRightMoveBlock() {
    if (!this.tetris) {
      return;
    }
    if (this.tetris.allowMove(1, 0)) {
      this.tetris.move(1, 0);
    }
  }
  requestDownMoveBlock() {
    if (!this.tetris) {
      return;
    }
    if (this.tetris.allowMove(0, 1)) {
      this.tetris.move(0, 1);
    }
  }
  requestDownMoveToBottomBlock() {
    if (!this.tetris) {
      return;
    }
    while (this.tetris.allowMove(0, 1)) {
      this.tetris.move(0, 1);
    }
  }
  requestRotateBlock() {
    if (!this.tetris) {
      return;
    }
    this.tetris.rotateBlock();
  }
};

Object.entries(stateDefinition).forEach(([k, v]) => (Game[k] = v));
Object.freeze(Game);

export default Game;
