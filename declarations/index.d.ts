export declare const VERSION_1_MODEL_ZERO: string;
export declare const VERSION_1_MODEL_ZERO_W: string;
export declare const VERSION_1_MODEL_A: string;
export declare const VERSION_1_MODEL_B_REV_1: string;
export declare const VERSION_1_MODEL_B_REV_2: string;
export declare const VERSION_1_MODEL_B_PLUS: string;
export declare const VERSION_1_MODEL_A_PLUS: string;
export declare const VERSION_2_MODEL_B: string;
export declare const VERSION_3_MODEL_B: string;
export interface IPinInfo {
    pins: Array<string>;
    peripherals: Array<string>;
}
export declare function getBoardRevision(): string;
export declare function getPins(): {
    [pinNumber: string]: IPinInfo;
};
export declare function getPinNumber(alias: string | number): number | null;
