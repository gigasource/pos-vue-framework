import { Point , Rectangle } from "./CoordinateSystem"

export function getElementPosition(el) {
  const rect = el.getBoundingClientRect(),
    offsetX = window.scrollX || document.documentElement.scrollLeft,
    offsetY = window.scrollY || document.documentElement.scrollTop;
  return new Rectangle(rect.top + offsetY, rect.left + offsetX, rect.bottom + offsetY, rect.right + offsetX)
}

export function getConnectionPoint(el, originPoint ,position,) {
  const rect = getElementPosition(el);
  const offsetWidth = el.offsetWidth;
  const offsetHeight = el.offsetHeight;
  const topPoint = new Point(rect.left + offsetWidth/2 - originPoint.x, rect.top - originPoint.y, 'top')
  const leftPoint = new Point(rect.left - originPoint.x, rect.top + offsetHeight/2 - originPoint.y, 'left')
  const bottomPoint = new Point(rect.left + offsetWidth/2 - originPoint.x, rect.top + offsetHeight - originPoint.y, 'bottom')
  const rightPoint = new Point (rect.left + offsetWidth - originPoint.x, rect.top + offsetHeight/2 - originPoint.y, 'right')

  switch(position) {
    case 'top':
      return [topPoint]
    case 'left':
      return [leftPoint]
    case 'bottom':
      return [bottomPoint]
    case 'right':
      return [rightPoint]
    case 'x':
      return [leftPoint, rightPoint]
    case 'y':
      return [topPoint, bottomPoint]
    default:
      return [topPoint, leftPoint, bottomPoint, rightPoint]
  }
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