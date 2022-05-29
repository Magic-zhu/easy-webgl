import { createContext, Point, Scene } from 'src/core/'
import { Line } from 'src/core/Line'
import { warn } from 'src/utils'
export class EwContext {
  gl: WebGLRenderingContext | null = null
  program: null | WebGLProgram = null
  strokeStyle: string = ''
  lineWidth: number = 1
  strokeRgb: number[] = []
  _path = []
  _pathArray = []
  _pathStatus = 'end'
  // * 划分区域 用于后续的优化
  _scene: Scene = new Scene()

  /**
   * @param query - id or class string like '.text' or '#text'
   */
  constructor(query: string) {
    this.init(query)
  }

  beginPath() {
    this._pathStatus = 'begin'
  }

  closePath() {
    this._pathStatus = 'end'
    this._pathArray.push(this._path)
    this._path = []
  }

  moveTo(x: number, y: number) {
    this._path.push(new Point(x, y, true))
    this._pathStatus = 'begin'
  }

  lineTo(x: number, y: number) {
    if (this._pathStatus !== 'begin') {
      warn('Not ivalid,please use moveTo first', 2)
      return
    }
    this._path.push(new Point(x, y, true))
  }

  /**
   * @param query - id or class string like '.text' or '#text'
   */
  init(query: string) {
    this.gl = createContext(query)
  }

  clearRect() {}

  clear() {
    const { gl } = this
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.clearDepth(1.0)
  }

  drawImage() {}

  fillRect(x: number, y: number, width: number, height: number) {}

  stroke() {
    for (let i = 0, l = this._pathArray.length; i < l; i++) {
      for (let j = 1, m = this._pathArray[i].length; j < m; j++) {
        const beginPoint: Point = this._pathArray[i][j - 1]
        const endPoint: Point = this._pathArray[i][j]
        this._scene.add(new Line({ beginPoint, endPoint, gl: this.gl }))
      }
    }
    if (this.lineWidth === 1) {
    }
  }

  strokeRect(x: number, y: number, width: number, height: number) {}
}
