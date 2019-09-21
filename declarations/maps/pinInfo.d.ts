import { IPinInfo } from 'j5-io-types';
export interface IRaspiPinInfo extends IPinInfo {
    gpio: number;
    spi?: number[];
    uart?: number[];
    i2c?: number[];
    pwm?: number[];
}
