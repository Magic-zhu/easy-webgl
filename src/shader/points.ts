export const pointsVertexShader = () => {
  return `
    attribute vec4 a_position;
    void main() {
      gl_Position = a_position;
    }
  `;
};
export const pointsFragmentShader = (r: number, g: number, b: number) => {
  return `
      void main(){
        gl_FragColor = vec4(${r}, ${g}, ${b}, 1.0);
      }
  `;
};
