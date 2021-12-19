export declare let isWebGl2: boolean;
export declare const createContext: (query: string) => WebGLRenderingContext;
export declare enum ShaderType {
    'VERTEX_SHADER' = "vs",
    'FRAGMENT_SHADER' = "fs"
}
export declare const loadShader: (gl: WebGLRenderingContext, type: ShaderType, source: string) => WebGLShader;
export declare const createShaderProgram: (gl: WebGLRenderingContext, vsSource: string, fsSource: string) => WebGLProgram;