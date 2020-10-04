import { prop, err } from "../common/Utils.js";
import Stage from "./Stage.js";

const Score = class {
  constructor() {
    prop(this, { curr: 0, total: 0 });
  }
  update(line, stage) {
    if (!stage instanceof Stage) err("invalid stage type");
    const { stage: level } = stage;
    const score = parseInt(level * 5 * 2 ** line);
    (this.curr += score), (this.total += score);
  }
};

export default Score;
