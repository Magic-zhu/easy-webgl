export declare class Matrix4 extends Array {
    constructor();
    getOrigin(self: boolean): Matrix4;
    orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number, self?: boolean): Matrix4;
    translate(tx: number, ty: number, tz: number, self?: boolean): Matrix4;
    scale(sx: number, sy: number, sz: number, self?: boolean): Matrix4;
}
