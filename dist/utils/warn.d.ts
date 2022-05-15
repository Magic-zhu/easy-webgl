export declare enum WARN_LEVEL {
    'WARN' = 1,
    'DANGER' = 2,
    'ERROR' = 3
}
export declare const warn: (err: string, level?: WARN_LEVEL) => void;
