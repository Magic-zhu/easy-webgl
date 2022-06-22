import { canvasToWebglCoordinate } from './canvasToWebglCoordinate'
import { Shape } from './Shape'
export class Point extends Shape {
  x: number = 0
  y: number = 0
  constructor(
    ix: number,
    iy: number,
    toWebGl: boolean = false,
    canvasWidth?: number,
    canvasHeight?: number
  ) {
    super()
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
