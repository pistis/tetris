import { prop } from "../common/Utils.js";
import Block from "../domain/Block.js";
import Board from "../domain/Board.js";

const RankingGame = class {
  constructor(row, col, listener) {
    prop(this, {
      row,
      col,
      listener,
      currentBlock: null,
      nextBlock: null,
      board: new Board(row, col),
    });
  }

  #setBlock() {
    this.currentBlock = this.nextBlock || Block.get();
    this.board.block = this.currentBlock;
    this.nextBlock = Block.get();
    this.notify();
  }

  #moveBlock() {
    if (this.board.moveBlock(0, 1)) {
      this.notify();
      return true;
    } else {
      return false;
    }
  }

  notify() {
    this.listener.update(
      this.board.matrixData,
      this.nextBlock && this.nextBlock.matrixData
    );
  }

  // TODO : stage 구현시 구현
  isClear() {
    return false;
  }

  isGameOver() {
    return this.board.acceptableBlock();
  }

  moveLeft() {
    this.board.moveLeft();
    this.notify();
  }

  moveRight() {
    this.board.moveRight();
    this.notify();
  }

  moveDown() {
    this.board.moveDown();
    this.notify();
  }

  moveBottom() {
    this.board.moveBottom();
    this.notify();
  }

  rotate() {
    this.board.rotate();
    this.notify();
  }

  play() {
    this.#setBlock();

    const playIntervalId = setInterval((_) => {
      if (this.#moveBlock(0, 1)) {
        return;
      }

      const line = this.board.clearLine();
      if (line) {
        console.log("점수를 획득 합니다.", line);
        console.log("스테이지가 넘어갑니다.?");
        // this.score.add(line, this.stage);
        // this.stage.update();
      }

      if (this.isClear()) {
        clearInterval(playIntervalId);
        this.listener.end();
        return;
      }

      if (this.isGameOver()) {
        clearInterval(playIntervalId);
        this.listener.end();
        return;
      }

      this.#setBlock();
    }, 300); // this.stage.speed

    this.listener.start();
  }
};

export default RankingGame;
