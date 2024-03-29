import { createContext, Point, Texture, injectAttribute2D, Matrix4 } from 'src/core/'
import { toRgb, warn } from 'src/utils'
import {
  pointsVertexShader,
  pointsFragmentShader,
  imagePointShader_A,
  imageFragmentShader_A
} from 'src/shader'
import { createShaderProgram, initBuffers } from 'src/core/base'
import { loadImage } from '../index'

export class EwContext {
  gl: WebGLRenderingContext | null = null
  program: null | WebGLProgram = null
  strokeStyle: string = '#000000'
  lineWidth: number = 1
  strokeRgb: number[] = []
  _path = []
  _pathArray = []
  _pathStatus = 'end'
  // * 目标dom
  _target: HTMLCanvasElement
  // !! cache the asyn tasks (decide when to draw)
  _asynTasks = []

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
    this.gl.viewport(0, 0, dom.width, dom.height)
  }

  clearRect() {
  }

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
          tx.texture = gl.createTexture()
          gl.bindTexture(gl.TEXTURE_2D, tx.texture)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
          tx.width = ele.width
          tx.height = ele.height
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
    this._drawImageB(image, dx, dy)
  }

  private async _drawImageB(
    image: string | HTMLImageElement,
    dx: number,
    dy: number,
    dWidth?: number,
    dHeight?: number
  ) {
    const imgStatus = this._loadAndCreateTexture(image, this.gl).then((tx: Texture) => {
      const program = createShaderProgram(
        this.gl,
        imagePointShader_A,
        imageFragmentShader_A
      )
      // 获取参数信息
      const positionLocation: GLint = this.gl.getAttribLocation(program, 'a_position')
      const texcoordLocation: GLint = this.gl.getAttribLocation(program, 'a_texcoord')
      const matrixLocation = this.gl.getUniformLocation(program, 'u_matrix')
      const textureLocation = this.gl.getUniformLocation(program, 'u_texture')

      // 初始化顶点数据buffer
      initBuffers(this.gl, [
        0, 0,
        0, 1,
        1, 0,
        1, 0,
        0, 1,
        1, 1])
      initBuffers(this.gl, [
        0, 0,
        0, 1,
        1, 0,
        1, 0,
        0, 1,
        1, 1
      ])

      injectAttribute2D(this.gl, positionLocation)
      injectAttribute2D(this.gl, texcoordLocation)


      let matrix = new Matrix4()
        .orthographic(0, this._target.width, this._target.height, 0, -1, 1)
        .scale(dWidth || tx.width, dHeight || tx.height, 1)
        .translate(dx / this._target.width, dy / this._target.height, 0)

      // Set the matrix.
      this.gl.uniformMatrix4fv(matrixLocation, false, matrix)
      // get the texture from texture unit 0
      this.gl.uniform1i(textureLocation, 0)
      // 2 triangles, 6 vertices
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
      this.gl.deleteProgram(program)
    })
    this._asynTasks.push(imgStatus)
  }

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
  ) {
  }

  fillRect(x: number, y: number, width: number, height: number) {
  }

  stroke() {
    const renderPoints = []
    for (let i = 0, l = this._pathArray.length; i < l; i++) {
      for (let j = 1, m = this._pathArray[i].length; j < m; j++) {
        const beginPoint: Point = this._pathArray[i][j - 1]
        const endPoint: Point = this._pathArray[i][j]
        renderPoints.push(
          beginPoint.x,
          beginPoint.y,
          1,
          1,
          endPoint.x,
          endPoint.y,
          1,
          1
        )
      }
    }
    Promise.all(this._asynTasks).then(() => {
      if (this.lineWidth === 1) {
        const color = toRgb(this.strokeStyle)
        initBuffers(this.gl, renderPoints)
        const shaderProgram = createShaderProgram(
          this.gl,
          pointsVertexShader(),
          pointsFragmentShader(color[0], color[1], color[2])
        )
        const vertexPosition = this.gl.getAttribLocation(
          shaderProgram,
          'p_position'
        )
        this.gl.vertexAttribPointer(vertexPosition, 4, this.gl.FLOAT, false, 0, 0)
        this.gl.enableVertexAttribArray(vertexPosition)
        this.gl.drawArrays(this.gl.LINES, 0, renderPoints.length / 4)
        this.gl.deleteProgram(shaderProgram)
      } else {
      }
    })
  }

  strokeRect(x: number, y: number, width: number, height: number) {
  }
}
