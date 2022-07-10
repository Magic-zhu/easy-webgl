import { createContext, Point, Texture } from 'src/core/'
import { warn } from 'src/utils'
import {
  pointsVertexShader,
  pointsFragmentShader,
  imagePointShader_A,
  imageFragmentShader_A,
} from 'src/shader'
import { createShaderProgram, initBuffers } from 'src/core/base'
import { loadImage } from '../index'
export class EwContext {
  gl: WebGLRenderingContext | null = null
  program: null | WebGLProgram = null
  strokeStyle: string = ''
  lineWidth: number = 1
  strokeRgb: number[] = []
  _path = []
  _pathArray = []
  _pathStatus = 'end'
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

  // proxy
  drawImage(...args: any[]) {
    if (args.length === 3) {
      this._drawImageA(args[0], args[1], args[2])
    }
    if (args.length === 5) {
      this._drawImageB(args[0], args[1], args[2], args[3], args[4])
    }
    if (args.length === 9) {
      this._drawImageC(
        args[0],
        args[1],
        args[2],
        args[3],
        args[4],
        args[5],
        args[6],
        args[7],
        args[8]
      )
    }
  }
  private _loadAndCreateTexture(
    _img: string | HTMLImageElement,
    gl: WebGLRenderingContext | WebGL2RenderingContext
  ): Promise<Texture> {
    return new Promise((resolve) => {
      if (typeof _img === 'string') {
        loadImage(_img, (ele: HTMLImageElement) => {
          const tx = new Texture()
          tx.width = ele.width
          tx.height = ele.height
          gl.bindTexture(gl.TEXTURE_2D, tx.texture)
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            ele
          )
          resolve(tx)
        })
      }
    })
  }
  private async _drawImageA(
    image: string | HTMLImageElement,
    dx: number,
    dy: number
  ) {
    const texture: Texture = await this._loadAndCreateTexture(image, this.gl)
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
    const program = createShaderProgram(
      this.gl,
      imagePointShader_A,
      imageFragmentShader_A
    )
    this.gl.useProgram(program)
  }
  private _drawImageB(
    image: string | HTMLImageElement,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number
  ) {}
  private _drawImageC(
    image: string | HTMLImageElement,
    sx: number,
    sy: number,
    sWidth: number,
    sHeight: number,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number
  ) {}

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
