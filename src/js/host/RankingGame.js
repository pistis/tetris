import { prop } from "../common/Utils.js";
import Block from "../domain/Block.js";
import Board from "../domain/Board.js";
import Stage from "../domain/Stage.js";

const RankingGame = class {
  constructor(row, col, listener) {
    prop(this, {
      row,
      col,
      listener,
      currentBlock: null,
      nextBlock: null,
      board: new Board(row, col),
      stage: new Stage(),
      playIntervalId: null,
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
      this.nextBlock && this.nextBlock.matrixData,
      0,
      this.stage.stage,
      this.stage.totalAchievement
    );
  }

  isClear() {
    return this.stage.isCompleted();
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

  #tick() {
    if (this.#moveBlock(0, 1)) {
      return;
    }

    const line = this.board.clearLine();
    if (line) {
      console.log("점수를 획득 합니다.", line);
      // this.score.add(line, this.stage);
      this.stage.update(line);
      if (this.stage.isAchieved() && this.stage.next()) {
        console.log("stage가 넘어갑니다.", this.stage.stage, this.stage.speed);
        this.stopTick();
        this.startTick();
      }
      this.notify();
    }

    if (this.isClear()) {
      this.stopTick();
      this.listener.end();
      return;
    }

    if (this.isGameOver()) {
      this.stopTick();
      this.listener.end();
      return;
    }

    this.#setBlock();
  }
  startTick() {
    this.playIntervalId = setInterval(() => {
      this.#tick();
    }, this.stage.speed);
  }
  stopTick() {
    clearInterval(this.playIntervalId);
  }
  play() {
    this.#setBlock();
    this.startTick();
    this.listener.start();
  }
};

export default RankingGame;
