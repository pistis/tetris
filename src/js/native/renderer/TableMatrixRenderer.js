import { el, add, backgroundColor, border } from "../Utils.js";
import MatrixRenderer from "./MatrixRenderer.js";

const TableMatrixRenderer = class extends MatrixRenderer {
  constructor(col, row, elem, defaultValue) {
    super(col, row, elem || el("table"), defaultValue);
    const { base, cells } = this;
    let { row: i } = this;
    while (i--) {
      const curr = [],
        tr = add(base, "tr");
      let j = col;
      cells.push(curr);
      while (j--) {
        curr.push(add(tr, "td").style);
      }
    }
    this.clear();
  }
  clear() {
    this.cells.forEach((row) => {
      row.forEach((style) => {
        backgroundColor(style, this.defaultValue, 0.5);
        border(style, 1, "solid", this.defaultValue);
      });
    });
  }
  _render(value) {
    this.clear();
    this.cells.forEach((row, i) => {
      row.forEach((style, j) => {
        try {
          if (value[i][j]) backgroundColor(style, value[i][j], 0.5);
        } catch (e) {
          debugger;
        }
      });
    });
  }
};

export default TableMatrixRenderer;
