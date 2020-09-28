import { prop } from "../../common/Utils.js";
import { sel } from "../Utils.js";
import Game from "../../Game.js";
import Panel from "./Panel.js";

const GameOverPanel = class extends Panel {
  #rootViewId = "intro_panel";
  #template = `
    <div id="${this.#rootViewId}" class="panel">
      <h1>Game Over T.T</h1>
      <button class="_go_title_btn">go title</button>
    </div>
  `;
  constructor() {
    super();
    prop(this, { base: null });
  }
  _created() {
    this.base = sel(`#${this.#rootViewId}`);
    this.initBindEventListener();
    this.base.addEventListener("click", this.onClickGoTitleButton);
  }
  _render() {
    return this.#template;
  }
  _beforeDestroyed() {
    this.base.removeEventListener("click", this.onClickGoTitleButton);
  }
  _destroyed() {}
  initBindEventListener() {
    this.onClickGoTitleButton = this.onClickGoTitleButton.bind(this);
  }
  onClickGoTitleButton($event) {
    if ($event.target.className === "_go_title_btn") {
      this._game.setState(Game.title);
    }
  }
};

export default GameOverPanel;
