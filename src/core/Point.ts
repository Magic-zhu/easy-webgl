import { canvasToWebglCoordinate } from './canvasToWebglCoordinate'
export class Point {
  x: number = 0
  y: number = 0
  constructor(
    ix: number,
    iy: number,
    toWebGl: boolean = false,
    canvasWidth?: number,
    canvasHeight?: number
  ) {
    if (toWebGl) {
      const { x, y } = canvasToWebglCoordinate(
        ix,
        iy,
        canvasWidth,
        canvasHeight
      )
      this.x = x
      this.y = y
    } else {
      this.x = ix
      this.y = iy
    }
  }
}
