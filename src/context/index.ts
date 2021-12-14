import { createContext } from 'src/core/';
class EwContext {
  gl: WebGLRenderingContext | null = null;
  program: null | WebGLProgram = null;

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
    const { gl } = this;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearDepth(1.0);
  }
  drawImage() {}
  fillRect(x: number, y: number, width: number, height: number) {}
  lineTo() {

  }
  moveTo() {

  }
  stroke() {}
  strokeRect(x: number, y: number, width: number, height: number) {}
}
export default EwContext;
