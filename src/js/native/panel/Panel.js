import { override } from "../../common/Utils.js";

const Panel = class {
  constructor() {}
  set game(v) {
    this._game = v;
  }
  render(game) {
    return this._render(game);
  }
  created(game) {
    this._created(game);
  }
  beforeDestroyed(game) {
    this._beforeDestroyed(game);
  }
  destroyed(game) {
    this._destroyed(game);
  }

  _render() {
    override();
  }
  _created() {
    override();
  }
  _beforeDestroyed() {
    override();
  }
  _destroyed() {
    override();
  }
};

export default Panel;
