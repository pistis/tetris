import { prop } from "../../common/Utils.js";
import { sel } from "../Utils.js";
import Game from "../../host/Game.js";
import Panel from "./Panel.js";

const TitlePanel = class extends Panel {
  #rootViewId = "title_panel";
  #template = `
    <div id="${this.#rootViewId}" class="panel">
      <div class="ascii-art" style="color: white;">
      
 ______    ___ ______  ____   ____ _____
 |      |  /  _]      ||    \ |    / ___/
 |      | /  [_|      ||  D  ) |  (   \_ 
 |_|  |_||    _]_|  |_||    /  |  |\__  |
   |  |  |   [_  |  |  |    \  |  |/  \ |
   |  |  |     | |  |  |  .  \ |  |\    |
   |__|  |_____| |__|  |__|\_||____|\___|
                                         
 
      </div>
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
    this.timeoutId = setTimeout(() => {
      this._game.setState(Game.play);
    }, 1000);
  }
  _beforeDestroyed() {
    clearTimeout(this.timeoutId);
  }
  _destroyed() {}
  initBindEventListener() {}
};

export default TitlePanel;
