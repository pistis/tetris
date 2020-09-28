export const prop = (target, v) => Object.assign(target, v);
export const err = (msg) => {
  throw new Error(msg || "unknown error");
};
export const override = () => {
  err("override");
};

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const randomBetween = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
};

export const random = (number) => {
  return parseInt(Math.random() * number);
};
