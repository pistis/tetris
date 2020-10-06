import { prop, random } from "../common/Utils.js";
import MatrixData from "../protocol/MatrixData.js";

// 각 블록을 2차원 배열로 표현
// 변환값 예시
// [
//  ㅗ -> [[0,1,0],[1,1,1]],
//  ㅏ -> [[1,0],[1,1],[1,0]],
//  ㅜ -> [[1,1,1],[0,1,0]],
//  ㅓ -> [[0,1],[1,1],[0,1]]
// ]
const block = [
  "5CBEE3-1|1|1|1,1111,1|1|1|1,1111", // I
  "F79726-11|11,11|11,11|11,11|11", // O
  "798BDB-010|111,10|11|10,111|010,01|11|01", // T
  "86CC3A-011|110,10|11|01,011|110,10|11|01", // S
  "ED5F4F-110|011,01|11|10,110|011,01|11|10", // Z
  "247CCE-100|111,11|10|10,111|001,01|01|11", // J
  "FFC53C-001|111,10|10|11,111|100,11|01|01", // L
].map((v) => v.split("-"));

const Block = class {
  static blocks = block.map(([c, b]) => [
    "#" + c,
    b
      .split(",")
      .map((v) => v.split("|").map((v) => v.split("").map((v) => parseInt(v)))),
  ]);

  static get() {
    const [color, blocks] = this.blocks[random(this.blocks.length)];
    return new Block(color, blocks, 0, 0);
  }

  constructor(color, blocks, x, y) {
    prop(this, { color, blocks, x, y, rotate: 0 });
  }

  get block() {
    return this.blocks[this.rotate];
  }

  get matrixData() {
    const matrixData = new MatrixData(this.block.length, this.block[0].length);

    this.block.forEach((v, i) =>
      v.forEach((v, j) => (v ? matrixData.cell(i, j, this.color) : 0))
    );
    return matrixData;
  }

  rotateLeft() {
    if (--this.rotate < 0) {
      this.rotate = 3;
    }
  }

  rotateRight() {
    if (++this.rotate > 3) {
      this.rotate = 0;
    }
  }

  move(dirX, dirY) {
    this.x += dirX;
    this.y += dirY;
  }

  position(x, y) {
    this.x = x;
    this.y = y;
  }
};

export default Block;
