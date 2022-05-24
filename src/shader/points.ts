export const pointsVertexShader = () => {
  return /*glsl*/ `
    attribute vec4 a_position;
    void main() {
      gl_Position = a_position;
    }
  `
}
export const pointsFragmentShader = (r: number, g: number, b: number) => {
  return /*glsl*/ `
      void main(){
        gl_FragColor = vec4(${r}, ${g}, ${b}, 1.0);
      }
  `
}
