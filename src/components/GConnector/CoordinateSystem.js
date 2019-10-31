export class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  isInside(region) {
    if (region instanceof Rectangle) {
      return this.x >= region.left && this.x <= region.right && this.y >= region.top && this.y <= region.bottom
    }
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