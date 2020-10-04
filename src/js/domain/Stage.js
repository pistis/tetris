import { prop } from "../common/Utils.js";
import SETTINGS from "../common/SETTINGS.js";

const Stage = class {
  constructor() {
    prop(this, { stage: 1, achievement: 0, totalAchievement: 0 });
  }

  get speed() {
    const {
      STAGE: {
        MAX,
        SPEED: { LOW, HIGH },
      },
    } = SETTINGS.RANKING_GAME;
    const term = (LOW - HIGH) / (MAX - 1);
    return LOW - (this.stage - 1) * term;
  }

  get goal() {
    const {
      STAGE: {
        GOAL: { DEFAULT, TERM },
      },
    } = SETTINGS.RANKING_GAME;
    return DEFAULT + TERM * (this.stage - 1);
  }

  isAchieved() {
    return this.achievement >= this.goal;
  }

  isCompleted() {
    return this.isAchieved() && this.stage === SETTINGS.RANKING_GAME.STAGE.MAX;
  }

  next() {
    if (!this.canNext()) {
      return false;
    }
    this.stage++;
    this.achievement = 0;
    return true;
  }

  canNext() {
    return this.stage < SETTINGS.RANKING_GAME.STAGE.MAX;
  }

  update(line) {
    this.achievement += line;
    this.totalAchievement += line;
  }
};

export default Stage;
