import { prop } from "../common/Utils.js";
import Block from "../domain/Block.js";
import Board from "../domain/Board.js";
import Stage from "../domain/Stage.js";
import Score from "../domain/Score.js";

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
      score: new Score(),
      playIntervalId: null,
    });
  }

  #setBlock() {
    this.currentBlock = this.nextBlock || Block.get();
    this.board.block = this.currentBlock;
    this.nextBlock = Block.get();
    this.notify();
  }

  #tick() {
    if (this.board.tick()) {
      this.notify();
      return true;
    } else {
      return false;
    }
  }

  #start() {
    this.playIntervalId = setInterval(() => {
      if (this.#tick()) {
        return;
      }

      this.#evaluate();

      this.#setBlock();
    }, this.stage.speed);
  }
  #stop() {
    clearInterval(this.playIntervalId);
  }

  #evaluate() {
    const line = this.board.clearLine();
    if (line) {
      this.score.update(line, this.stage);
      this.stage.update(line);
      if (this.stage.isAchieved() && this.stage.next()) {
        console.log("stage가 넘어갑니다.", this.stage.stage, this.stage.speed);
        this.#stop();
        this.#start();
      }
      this.notify();
    }

    if (this.isClear()) {
      this.#stop();
      this.listener.end();
      return;
    }

    if (this.isGameOver()) {
      this.#stop();
      this.listener.end();
      return;
    }
  }

  notify() {
    this.listener.update(
      this.board.matrixData,
      this.nextBlock && this.nextBlock.matrixData,
      this.score.total,
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
    this.#evaluate();

    this.#setBlock();
    this.notify();
  }

  rotate() {
    this.board.rotate();
    this.notify();
  }

  play() {
    this.#setBlock();
    this.#start();
    this.listener.start();
  }
};

export default RankingGame;
