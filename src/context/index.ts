import {createContext, createShaderProgram} from 'src/core/';

export class EwContext {
  gl: WebGLRenderingContext | null = null;
  program: null | WebGLProgram = null;
  strokeStyle:string = '';
  strokeRgb:number [] = [];
  /**
   * @param query - id or class string like '.text' or '#text'
   */
  constructor(query: string) {
    this.init(query);
  }

  beginPath() {

  }

  closePath() {

  }

  /**
   * @param query - id or class string like '.text' or '#text'
   */
  init(query: string) {
    this.gl = createContext(query);
  }

  // TODO : now clear all
  clearRect() {
    const {gl} = this;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearDepth(1.0);
  }

  drawImage() {
  }

  fillRect(x: number, y: number, width: number, height: number) {
  }

  lineTo() {
    createShaderProgram(this.gl, lineVertexShader(),
        lineFragmentShader(
            this.strokeRgb[0], this.strokeRgb[1], this.strokeRgb[2]));
  }

  moveTo() {

  }

  stroke() {
  }

  strokeRect(x: number, y: number, width: number, height: number) {
  }
}

