import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";

export default [{
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/easy-webgl-iife.min.js',
      format: 'iife',
      name:'EW'
    },
    {
      file: 'dist/easy-webgl-es.min.js',
      format: 'EW'
    }
  ],
  plugins: [
    typescript(),
    terser(),
  ],
}]
