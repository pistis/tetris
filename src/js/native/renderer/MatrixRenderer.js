import { prop, override, err } from "../../Utils.js";
import MatrixData from "../../protocol/MatrixData.js";

const MatrixRenderer = class {
  constructor(col, row, base, defaultValue) {
    prop(this, { col, row, base, defaultValue, cells: [] });
  }
  clear() {
    override();
  }
  render(value) {
    if (!(value instanceof MatrixData)) err("invalid");
    this._render(value);
  }
  _render(value) {
    override();
  }
};

export default MatrixRenderer;
