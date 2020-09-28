import { prop, err } from "../common/Utils.js";
import { inner } from "../native/Utils.js";
import Tetris from "../domain/Tetris.js";

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
  constructor(base) {
    prop(this, {
      base,
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
};

Object.entries(stateDefinition).forEach(([k, v]) => (Game[k] = v));
Object.freeze(Game);

export default Game;
