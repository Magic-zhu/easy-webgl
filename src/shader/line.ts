const lineVertexShader = () => {
  return `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(vec2,1.0,1.0);
    }
  `;
};
const lineFragmentShader = (r: number, g: number, b: number) => {
  return `
    gl_FragColor = vec4(${r}, ${g}, ${b}, 1.0)
  `;
};
