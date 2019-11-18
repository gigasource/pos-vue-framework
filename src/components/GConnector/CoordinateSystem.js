export class Point {
  constructor(x, y, position, value) {
    this.x = x
    this.y = y
    this.position = position
    this.value = value
    this.startCount = 0
    this.startLimit = Infinity
    this.endCount = 0
    this.endLimit = Infinity
  }

  isInside(regions) {
    for (let region of regions) {
      if (region instanceof Rectangle && this.x >= region.left && this.x <= region.right && this.y >= region.top && this.y <= region.bottom) {
        return region
      } else if (region instanceof Circle && Math.sqrt(Math.pow(this.x - region.center.x, 2) + Math.pow(this.y - region.center.y, 2)) <= region.radius) {
        return region
      }
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

export class Circle {
  constructor (center, radius) {
    this.center = center
    this.radius = radius
  }
}