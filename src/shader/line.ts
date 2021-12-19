export const lineVertexShader = () => {
  return `
    attribute vec4 a_position;
    void main() {
      gl_Position = a_position;
    }
  `;
};
export const lineFragmentShader = (r: number, g: number, b: number) => {
  return `
    gl_FragColor = vec4(${r}, ${g}, ${b}, 1.0)
  `;
};
