import { Point } from './Point';
import { Shape } from './Shape';
interface LineOption {
    beginPoint: Point;
    endPoint: Point;
    gl: WebGL2RenderingContext | WebGLRenderingContext;
    lineWidth?: number;
}
export declare class Line extends Shape {
    constructor(option: LineOption);
    draw(): void;
}
export declare class LineW extends Line {
    constructor(option: LineOption);
}
export {};
