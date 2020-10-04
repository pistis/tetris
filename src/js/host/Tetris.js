import { prop } from "../common/Utils.js";
import Block from "./Block.js";
import MatrixData from "../protocol/MatrixData.js";

// TODO : Board를 만들어서 Board가 escape, overlap 처리를 하도록
// TODO : matrix data의 효율적인 사용
const Tetris = class {
  constructor(col, row, listener) {
    prop(this, {
      col,
      row,
      listener,
      currentBlock: null,
      nextBlock: null,
      boardMatrixData: new MatrixData(row, col),
      movingMatrixData: new MatrixData(row, col),
    });
  }

  _setCurrentBlock() {
    this.currentBlock = this.nextBlock || Block.get();
    const {
      block: {
        0: { length: colLen },
      },
    } = this.currentBlock;
    this.currentBlock.move(parseInt((this.col - colLen) * 0.5), -1);
  }

  _setNextBlock() {
    this.nextBlock = Block.get();
    const { block, color } = this.nextBlock;
    const blockMatrixData = new MatrixData(block.length, block[0].length);

    block.forEach((v, i) =>
      v.forEach((v, j) => (v ? blockMatrixData.cell(i, j, color) : 0))
    );

    this.listener.update(null, blockMatrixData);
  }

  _nextTick() {
    this._setCurrentBlock();
    this._setNextBlock();
  }

  _acceptableMoving(x, y) {
    const { block, x: currentX, y: currentY } = this.currentBlock;
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

  _move(x, y) {
    this.movingMatrixData.all(...this.boardMatrixData);
    const { block, color } = this.currentBlock;
    this.currentBlock.move(x, y);

    block.forEach((v, i) =>
      v.forEach((v, j) =>
        v
          ? this.movingMatrixData.cell(
              i + this.currentBlock.y,
              j + this.currentBlock.x,
              color
            )
          : 0
      )
    );
    this.listener.update(this.movingMatrixData);
  }

  _determineBoardData() {
    this.boardMatrixData.all(...this.movingMatrixData);
  }
  _clearLine() {
    let line = 0;
    this.boardMatrixData.forEach((row) => {
      if (row.every((v) => v)) {
        line++;
        row.fill(null);
      }
    });

    this.listener.update(this.boardMatrixData);
    return line;
  }

  _adjustLine() {
    const tempMatrixData = new MatrixData(this.row, this.col);
    let lastRow = tempMatrixData.length - 1;
    for (let i = this.boardMatrixData.length - 1; i >= 0; i--) {
      const row = this.boardMatrixData[i];
      if (row.some((v) => v)) {
        tempMatrixData.row(lastRow--, ...row);
      }
    }
    this.boardMatrixData.all(...tempMatrixData);
    this.listener.update(this.boardMatrixData);
  }

  _isGameOver() {
    return this.boardMatrixData[0].some((v) => v);
  }

  moveLeft() {
    if (this._acceptableMoving(-1, 0)) {
      this._move(-1, 0);
    }
  }

  moveRight() {
    if (this._acceptableMoving(1, 0)) {
      this._move(1, 0);
    }
  }

  moveDown() {
    if (this._acceptableMoving(0, 1)) {
      this._move(0, 1);
    }
  }

  moveBottom() {
    while (this._acceptableMoving(0, 1)) {
      this._move(0, 1);
    }
  }

  rotate() {
    this.currentBlock.left();
    if (!this._acceptableMoving(0, 0)) {
      this.currentBlock.right();
    } else {
      this._move(0, 0);
    }
  }

  play() {
    this._nextTick();

    const playIntervalId = setInterval((_) => {
      if (this._acceptableMoving(0, 1)) {
        this._move(0, 1);
        return;
      }

      this._determineBoardData();
      const line = this._clearLine();
      if (line) {
        this._adjustLine();
      }

      if (this._isGameOver()) {
        clearInterval(playIntervalId);
        this.listener.end();
        return;
      } else {
        this._nextTick();
      }
    }, 300);

    this.listener.start();
  }
};

export default Tetris;
