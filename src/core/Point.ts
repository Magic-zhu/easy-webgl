import { canvasToWebglCoordinate } from './canvasToWebglCoordinate'
export class Point {
  x: number = 0
  y: number = 0
  constructor(ix: number, iy: number, toWebGl: boolean = false) {
    if (toWebGl) {
      const { x, y } = canvasToWebglCoordinate(ix, iy)
      this.x = x
      this.y = y
    } else {
      this.x = ix
      this.y = iy
    }
  }
}
