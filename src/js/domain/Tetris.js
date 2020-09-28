import { prop } from "../Utils.js";
import Block from "./Block.js";
import MatrixData from "../protocol/MatrixData.js";
import Game from "../Game.js";

const Tetris = class {
  constructor(col, row) {
    prop(this, {
      col,
      row,
      currentBlock: null,
      nextBlock: null,
      blockPosition: { x: 0, y: 0 },
      playMatrixData: new MatrixData(row, col),
      movingMatrixData: new MatrixData(row, col),
    });
  }

  next() {
    this.currentBlock = this.nextBlock || Block.get();
    this.nextBlock = Block.get();
    const {
      block: {
        0: { length: colLen },
      },
      length: rowLen,
    } = this.currentBlock;
    this.blockPosition.x = parseInt((this.col - colLen) * 0.5);
    this.blockPosition.y = -1;
  }

  rotateBlock() {
    this.currentBlock.left();
    if (!this.allowMove(0, 0)) {
      this.currentBlock.right();
    } else {
      this.move(0, 0);
    }
  }

  allowMove(x, y) {
    const { block } = this.currentBlock;
    x = this.blockPosition.x + x;
    y = this.blockPosition.y + y;

    return !block.some((v, i) => {
      return v.some((v, j) => {
        return (
          v &&
          (this.playMatrixData.escape(i + y, j + x) ||
            this.playMatrixData.isOverlap(i + y, j + x, v))
        );
      });
    });
  }

  move(x, y) {
    this.movingMatrixData.all(...this.playMatrixData);
    const { block, color } = this.currentBlock;
    x = this.blockPosition.x += x;
    y = this.blockPosition.y += y;

    block.forEach((v, i) =>
      v.forEach((v, j) =>
        v
          ? this.movingMatrixData.cell(
              i + this.blockPosition.y,
              j + this.blockPosition.x,
              color
            )
          : 0
      )
    );
    this.eventsListener[Game.EVENTS.TETRIS_PLAY_MOVED_BLOCK](
      this.movingMatrixData
    );
  }

  clearLine() {
    let line = 0;
    this.movingMatrixData.forEach((row) => {
      if (row.every((v) => v)) {
        line++;
        row.fill(null);
      }
    });

    this.eventsListener[Game.EVENTS.TETRIS_PLAY_REMOVED_LINE](
      this.movingMatrixData
    );
    return line;
  }

  adjustLine() {
    const tempMatrixData = new MatrixData(this.row, this.col);
    let lastRow = tempMatrixData.length - 1;
    for (let i = this.movingMatrixData.length - 1; i >= 0; i--) {
      const row = this.movingMatrixData[i];
      if (row.some((v) => v)) {
        tempMatrixData.row(lastRow--, ...row);
      }
    }
    this.movingMatrixData.all(...tempMatrixData);
    this.eventsListener[Game.EVENTS.TETRIS_PLAY_ADJUSTED_LINE](
      this.movingMatrixData
    );
  }

  play(eventsListener) {
    this.eventsListener = eventsListener;
    this.next();
    const playIntervalId = setInterval((_) => {
      if (this.allowMove(0, 1)) {
        this.move(0, 1);
        return;
      }
      const line = this.clearLine();
      if (line) {
        this.adjustLine();
      }
      this.playMatrixData.all(...this.movingMatrixData);

      if (this.playMatrixData[0].some((v) => v)) {
        clearInterval(playIntervalId);
        this.eventsListener[Game.EVENTS.TETRIS_PLAY_GAME_OVER]();
        return;
      } else {
        this.next();
      }
    }, 300);
  }
};

export default Tetris;
