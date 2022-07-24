import { warn, WARN_LEVEL } from '../utils'
export let isWebGl2 = true
export const createContext = (query: string) => {
  const dom: HTMLCanvasElement = document.querySelector(query)
  if (!dom) {
    warn('Dom is not available!')
    return
  }
  let gl: WebGLRenderingContext = dom.getContext('webgl2')
  if (!gl) {
    gl = dom.getContext('webgl')
    isWebGl2 = false
  }
  if (!gl) {
    warn('not support WebGL!', WARN_LEVEL.ERROR)
  }
  return { gl, dom }
}

export enum ShaderType {
  'VERTEX_SHADER' = 'vs',
  'FRAGMENT_SHADER' = 'fs',
}

export const loadShader = (
  gl: WebGLRenderingContext,
  type: ShaderType,
  source: string // ~ shader string
) => {
  const shader =
    type === 'vs'
      ? gl.createShader(gl.VERTEX_SHADER)
      : gl.createShader(gl.FRAGMENT_SHADER) // 创建
  gl.shaderSource(shader, source) // 设置
  gl.compileShader(shader) // 编译
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    throw new Error(
      'An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader)
    )
  }
  return shader
}

export const createShaderProgram = (
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
) => {
  const vertexShader = loadShader(gl, ShaderType.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, ShaderType.FRAGMENT_SHADER, fsSource)
  // 创建着色器程序
  const shaderProgram = gl.createProgram()
  // 往WebGLProgram 添加一个片段或者顶点着色器
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram) // 链接程序到 上下文
  // 创建失败， alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw new Error(
      'Unable to initialize the shader program: ' +
        gl.getProgramInfoLog(shaderProgram)
    )
  }
  gl.useProgram(shaderProgram)
  return shaderProgram
}

/**
 * 初始化顶点buffer
 * @param gl
 * @param vertices - 顶点数据
 * @return {WebGLBuffer}
 */
export const initBuffers = (
  gl: WebGL2RenderingContext | WebGLRenderingContext,
  vertices: number[]
):WebGLBuffer => {
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  return positionBuffer
}

// * 设置属性，从缓冲中提取数据
// todo
export const injectAttribute2D = (gl:WebGLRenderingContext|WebGL2RenderingContext,buffer:WebGLBuffer,data:GLint) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(data);
  gl.vertexAttribPointer(data, 2, gl.FLOAT, false, 0, 0);
}
