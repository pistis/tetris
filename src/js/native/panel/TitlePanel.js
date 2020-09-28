import { prop } from "../../common/Utils.js";
import { sel } from "../Utils.js";
import Game from "../../host/Game.js";
import Panel from "./Panel.js";

const TitlePanel = class extends Panel {
  #rootViewId = "title_panel";
  #template = `
    <div id="${this.#rootViewId}" class="panel">
      <h1>Tetris</h1>
      <button class="_play_btn">play</button>
    </div>
  `;
  constructor() {
    super();
    prop(this, { base: null });
  }
  _render() {
    return this.#template;
  }
  _created() {
    this.base = sel(`#${this.#rootViewId}`);
    this.initBindEventListener();
    this.base.addEventListener("click", this.onClickPlayButton);
  }
  _beforeDestroyed() {
    this.base.removeEventListener("click", this.onClickPlayButton);
  }
  _destroyed() {}
  initBindEventListener() {
    this.onClickPlayButton = this.onClickPlayButton.bind(this);
  }
  onClickPlayButton($event) {
    if ($event.target.className === "_play_btn") {
      this._game.setState(Game.intro);
    }
  }
};

export default TitlePanel;
