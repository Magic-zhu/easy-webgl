export declare class EwContext {
    gl: WebGLRenderingContext | null;
    program: null | WebGLProgram;
    strokeStyle: string;
    strokeRgb: number[];
    constructor(query: string);
    beginPath(): void;
    closePath(): void;
    init(query: string): void;
    clearRect(): void;
    drawImage(): void;
    fillRect(x: number, y: number, width: number, height: number): void;
    lineTo(): void;
    moveTo(): void;
    stroke(): void;
    strokeRect(x: number, y: number, width: number, height: number): void;
}
