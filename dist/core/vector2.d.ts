declare class Vector2 {
    x: number;
    y: number;
    isVector2: boolean;
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
    setScalar(scalar: any): this;
    setX(x: number): this;
    setY(y: number): this;
    clone(): Vector2;
    copy(v: Vector2): this;
    add(v: Vector2): this;
    addScalar(s: number): this;
    addVectors(a: Vector2, b: Vector2): this;
    addScaledVector(v: any, s: any): this;
    sub(v: Vector2): this;
    subScalar(s: number): this;
    subVectors(a: Vector2, b: Vector2): this;
    multiply(v: Vector2): this;
    multiplyScalar(s: number): this;
    divide(v: Vector2): this;
    divideScalar(s: number): this;
    applyMatrix3(m: any): this;
    min(v: Vector2): this;
    max(v: Vector2): this;
    clamp(min: any, max: any): this;
    clampScalar(minVal: any, maxVal: any): this;
    clampLength(min: any, max: any): this;
    floor(): this;
    ceil(): this;
    round(): this;
    roundToZero(): this;
    dot(v: Vector2): number;
    cross(v: Vector2): number;
    lengthSq(): number;
    length(): number;
    manhattanLength(): number;
    normalize(): this;
    angle(): number;
    distanceTo(v: any): number;
    distanceToSquared(v: any): number;
    manhattanDistanceTo(v: any): number;
    setLength(length: any): this;
    lerp(v: any, alpha: any): this;
    lerpVectors(v1: any, v2: any, alpha: any): this;
    equals(v: any): boolean;
    fromArray(array: any, offset?: number): this;
    toArray(array?: any[], offset?: number): any[];
    fromBufferAttribute(attribute: any, index: any, offset: any): this;
    rotateAround(center: any, angle: any): this;
    random(): this;
}
export { Vector2 };
