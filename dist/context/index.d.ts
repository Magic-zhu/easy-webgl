import { Scene } from 'src/core/';
export declare class EwContext {
    gl: WebGLRenderingContext | null;
    program: null | WebGLProgram;
    strokeStyle: string;
    lineWidth: number;
    strokeRgb: number[];
    _path: any[];
    _pathArray: any[];
    _pathStatus: string;
    _scene: Scene;
    constructor(query: string);
    beginPath(): void;
    closePath(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    init(query: string): void;
    clearRect(): void;
    clear(): void;
    drawImage(): void;
    fillRect(x: number, y: number, width: number, height: number): void;
    stroke(): void;
    strokeRect(x: number, y: number, width: number, height: number): void;
}
