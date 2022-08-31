export interface IElementRect {
  x: number;
  y: number;
  bottom: number;
  right: number;
  height: number;
  left: number;
  top: number;
  width: number;
  centerX: number;
  centerY: number;
}

export function extractElementRect(el: HTMLElement): IElementRect {
  const { height, left, top, width, ...rest } = el.getBoundingClientRect();
  const centerX = width / 2;
  const centerY = height / 2;
  return { height, left, top, width, centerX, centerY, ...rest };
}
