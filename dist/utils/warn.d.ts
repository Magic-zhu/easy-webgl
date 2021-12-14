export declare enum WARN_LEVEL {
    'WARN' = 1,
    'DANGER' = 2,
    'ERROR' = 3
}
export declare const Warn: (err: string, level?: WARN_LEVEL) => void;
