import { hexToRgb } from "../common/Color.js";

export const sel = (selector) => document.querySelector(selector);
export const addClass = (el, cls) => el.classList.add(cls);
export const removeClass = (el, cls) => el.classList.remove(cls);
export const el = (value) => document.createElement(value);
export const add = (parent, child) =>
  parent.appendChild(typeof child === "string" ? el(child) : child);
export const backgroundColor = (style, color, alpha = 1) => {
  const { r, g, b } = hexToRgb(color);
  style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
export const border = (style, weight, bStyle, color) => {
  style.border = `${weight}px ${bStyle} ${color}`;
};
export const inner = (el, contents) => {
  el.innerHTML = contents;
};
