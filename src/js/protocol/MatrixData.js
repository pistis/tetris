import { prop } from "../common/Utils.js";

const MatrixData = class extends Array {
  constructor(row, col) {
    super(row);
    prop(this, { col });
    this.clear();
  }
  clear() {
    for (let i = 0; i < this.length; i++) {
      this[i] = Array(this.col).fill(null);
    }
  }
  escape(row, col) {
    return 0 > row || this.length - 1 < row || 0 > col || this.col - 1 < col;
  }
  cell(row, col, value) {
    if (this.escape(row, col)) return this;
    const r = this[row] || (this[row] = []);
    r[col] = value;
    return this;
  }
  overlap(row, col) {
    const r = this[row];
    return r && r[col];
  }
  row(row, ...value) {
    return value.forEach((v, i) => this.cell(row, i, v)), this;
  }
  all(...rows) {
    return rows.forEach((v, i) => this.row(i, ...v)), this;
  }
};

export default MatrixData;
