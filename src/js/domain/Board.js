import { prop, err } from "../common/Utils.js";
import Block from "../domain/Block.js";
import MatrixData from "../protocol/MatrixData.js";

const Board = class {
  constructor(row, col) {
    prop(this, {
      row,
      col,
      _block: null,
      moving: false,
      boardMatrixData: new MatrixData(row, col),
      movingMatrixData: new MatrixData(row, col),
    });
  }

  get matrixData() {
    return this.moving ? this.movingMatrixData : this.boardMatrixData;
  }

  set block(block) {
    if (!block instanceof Block) err("invalid block type");
    this._block = block;
    const {
      block: {
        0: { length: colLen },
      },
    } = this._block;
    this._block.move(parseInt((this.col - colLen) * 0.5), -1);
  }

  #acceptableMoving(x, y) {
    const { block, x: currentX, y: currentY } = this._block;
    const targetX = currentX + x;
    const targetY = currentY + y;

    return !block.some((v, i) => {
      return v.some((v, j) => {
        return (
          v &&
          (this.boardMatrixData.escape(i + targetY, j + targetX) ||
            this.boardMatrixData.overlap(i + targetY, j + targetX, v))
        );
      });
    });
  }

  #stopBlock() {
    this.moving = false;
    this.boardMatrixData.all(...this.movingMatrixData);
  }

  #moveBlock(x, y) {
    this.moving = true;
    this.movingMatrixData.all(...this.boardMatrixData);
    this._block.move(x, y);
    const { block, color, x: currentX, y: currentY } = this._block;

    block.forEach((v, i) =>
      v.forEach((v, j) =>
        v ? this.movingMatrixData.cell(i + currentY, j + currentX, color) : 0
      )
    );
  }

  tick() {
    const x = 0,
      y = 1;
    if (this.#acceptableMoving(x, y)) {
      this.#moveBlock(x, y);
      return true;
    } else {
      this.#stopBlock();
      return false;
    }
  }

  moveBottom() {
    while (this.#acceptableMoving(0, 1)) {
      this.#moveBlock(0, 1);
    }
    this.#stopBlock();
  }

  moveLeft() {
    if (this.#acceptableMoving(-1, 0)) {
      this.#moveBlock(-1, 0);
    }
  }

  moveRight() {
    if (this.#acceptableMoving(1, 0)) {
      this.#moveBlock(1, 0);
    }
  }

  moveDown() {
    if (this.#acceptableMoving(0, 1)) {
      this.#moveBlock(0, 1);
    }
  }

  rotate() {
    let repeat = 4;
    let { x, y } = this._block;
    let rotated = false;
    while (repeat--) {
      this._block.rotateLeft();
      if (!this.#acceptableMoving(0, 0)) {
        this._block.rotateRight();
        this._block.move(-1, 0);
      } else {
        rotated = true;
        break;
      }
    }
    if (!rotated) {
      this._block.position(x, y);
    }

    this.#moveBlock(0, 0);
  }

  clearLine() {
    let line = 0;
    this.boardMatrixData.forEach((row) => {
      if (row.every((v) => v)) {
        line++;
        row.fill(null);
      }
    });

    const tempMatrixData = new MatrixData(this.row, this.col);
    let lastRow = tempMatrixData.length - 1;
    for (let i = this.boardMatrixData.length - 1; i >= 0; i--) {
      const row = this.boardMatrixData[i];
      if (row.some((v) => v)) {
        tempMatrixData.row(lastRow--, ...row);
      }
    }
    this.boardMatrixData.all(...tempMatrixData);

    return line;
  }

  // TODO : 이름 바꾸자.
  acceptableBlock() {
    return this.boardMatrixData[0].some((v) => v);
  }
};

export default Board;
