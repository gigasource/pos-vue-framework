export class Point {
  constructor(x, y, position, value) {
    this.x = x
    this.y = y
    this.position = position
    this.value = value
  }

  isInside(region) {
    if (region instanceof Rectangle) {
      return this.x >= region.left && this.x <= region.right && this.y >= region.top && this.y <= region.bottom
    }
  }
}

export class Path {
  constructor(startPoint, endPoint) {
    this.startPoint = startPoint
    this.endPoint = endPoint
  }
}

export class Rectangle {
  constructor(top, left, bottom, right) {
    this.top = top
    this.left = left
    this.bottom = bottom
    this.right = right
  }
}