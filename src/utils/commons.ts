export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const qs = (s: string, o?: Document | Element): Element | null => {
  if (typeof document === 'undefined' && typeof o === 'undefined') return null;
  const root = o ?? document;
  return (root as Document | Element).querySelector(s);
};

export const qsa = (s: string, o?: Document | Element): Element[] => {
  if (typeof document === 'undefined' && typeof o === 'undefined') return [];
  const root = o ?? document;
  return Array.from((root as Document | Element).querySelectorAll(s));
};

export const rect = (el: Element): DOMRect => {
  if (!el || typeof (el as any).getBoundingClientRect !== 'function')
    return { x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0 } as DOMRect;
  return el.getBoundingClientRect();
};

export const rand = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const offset = (el: Element): { top: number; left: number } => {
  if (typeof document === 'undefined' || typeof window === 'undefined' || !el)
    return { top: 0, left: 0 };
  const box = el.getBoundingClientRect();
  const docElem = document.documentElement;

  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft
  };
};

export const diagonal = (w: number, h: number): number => Math.sqrt(w * w + h * h);

/**
 * Distance between two points
 *
 * @param x1 X coord of the first point
 * @param y1 Y coord of the first point
 * @param x2 X coord of the second point
 * @param y2 Y coord of the second point
 * @returns Computed distance
 */
export const distance = (x1: number, y1: number, x2: number, y2: number): number =>
  diagonal(x1 - x2, y1 - y2);

export const removeHTML = (str: string = '') => str.replace(/<\/?[^>]+(>|$)/g, '');
