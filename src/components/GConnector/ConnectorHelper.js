import { Point , Rectangle } from "./CoordinateSystem"

export function getElementPosition(el) {
  const rect = el.getBoundingClientRect(),
    offsetX = window.scrollX || document.documentElement.scrollLeft,
    offsetY = window.scrollY || document.documentElement.scrollTop;
  return new Rectangle(rect.top + offsetY, rect.left + offsetX, rect.bottom + offsetY, rect.right + offsetX)
}

export function getConnectionPoint(el) {
  const rect = getElementPosition(el);
  const offsetWidth = el.offsetWidth;
  const offsetHeight = el.offsetHeight;
  return [
    new Point(rect.left + offsetWidth/2, rect.top),
    new Point(rect.left, rect.top + offsetHeight/2),
    new Point(rect.left + offsetWidth/2, rect.top + offsetHeight),
    new Point (rect.left + offsetWidth, rect.top + offsetHeight/2)
  ]
}

export function createCircle(cx, cy, r, stroke, strokeWidth, fill) {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute('cx', cx)
  circle.setAttribute('cy', cy)
  circle.setAttribute('r', r)
  circle.setAttribute('stroke', stroke)
  circle.setAttribute('stroke-width', strokeWidth)
  circle.setAttribute('fill', fill)

  return circle
}