import { Point } from './Point'
import { Shape } from './Shape'
interface LineOption {
  beginPoint: Point
  endPoint: Point
  gl: WebGL2RenderingContext | WebGLRenderingContext
  lineWidth?: number
}
export class Line extends Shape {
  constructor(option: LineOption) {
    super()
    this.draw()
  }
  draw() {}
}

export class LineW extends Line {
  constructor(option: LineOption) {
    super(option)
  }
}
