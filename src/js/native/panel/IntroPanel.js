import { prop } from "../../Utils.js";
import { sel } from "../Utils.js";
import Game from "../../Game.js";
import Panel from "./Panel.js";

const IntroPanel = class extends Panel {
  #rootViewId = "intro_panel";
  #template = `
    <div id="${this.#rootViewId}" class="panel">
      <h1>Start Tetris... Let's Play~</h1>
    </div>
  `;
  constructor() {
    super();
    prop(this, { base: null });
  }
  _created() {
    this.base = sel(`#${this.#rootViewId}`);
    this.initBindEventListener();
    this.timeoutId = setTimeout(() => {
      this._game.setState(Game.play);
    }, 500);
  }
  _render() {
    return this.#template;
  }
  _beforeDestroyed() {
    clearTimeout(this.timeoutId);
  }
  _destroyed() {}
  initBindEventListener() {}
};

export default IntroPanel;
