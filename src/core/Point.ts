import { canvasToWebglCoordinate } from './canvasToWebglCoordinate'
export class Point {
  x: number = 0
  y: number = 0
  constructor(ix: number, iy: number) {
    const { x, y } = canvasToWebglCoordinate(ix, iy)
    this.x = x
    this.y = y
  }
}
