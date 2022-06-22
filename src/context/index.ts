import { createContext, Point, Scene } from 'src/core/'
import { Line } from 'src/core/Line'
import { warn } from 'src/utils'
import { pointsVertexShader, pointsFragmentShader } from 'src/shader/points'
import { createShaderProgram, initBuffers } from 'src/core/base'
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
  // * 目标dom
  _target: HTMLCanvasElement

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
    this._path.push(
      new Point(x, y, true, this._target.width, this._target.height)
    )
    this._pathStatus = 'begin'
  }

  lineTo(x: number, y: number) {
    if (this._pathStatus !== 'begin') {
      warn('Not ivalid,please use moveTo first', 2)
      return
    }
    this._path.push(
      new Point(x, y, true, this._target.width, this._target.height)
    )
  }

  /**
   * @param query - id or class string like '.text' or '#text'
   */
  init(query: string) {
    const { gl, dom } = createContext(query)
    this.gl = gl
    this._target = dom
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
    const renderPoints = []
    for (let i = 0, l = this._pathArray.length; i < l; i++) {
      for (let j = 1, m = this._pathArray[i].length; j < m; j++) {
        const beginPoint: Point = this._pathArray[i][j - 1]
        const endPoint: Point = this._pathArray[i][j]
        renderPoints.push(
          beginPoint.x,
          beginPoint.y,
          0,
          1,
          endPoint.x,
          endPoint.y,
          0,
          1
        )
        this._scene.add(new Line({ beginPoint, endPoint, gl: this.gl }))
      }
    }

    if (this.lineWidth === 1) {
      const shaderProgram = createShaderProgram(
        this.gl,
        pointsVertexShader(),
        pointsFragmentShader(1.0, 0.5, 0.0)
      )
      initBuffers(this.gl, renderPoints)
      const vertexPosition = this.gl.getAttribLocation(
        shaderProgram,
        'a_position'
      )
      this.gl.vertexAttribPointer(vertexPosition, 4, this.gl.FLOAT, false, 0, 0)
      this.gl.enableVertexAttribArray(vertexPosition)
      this.gl.drawArrays(this.gl.LINE_STRIP, 0, renderPoints.length / 4)
    } else {
    }
  }

  strokeRect(x: number, y: number, width: number, height: number) {}
}
