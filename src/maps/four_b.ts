/*
The MIT License (MIT)

Copyright (c) Bryan Hughes <bryan@nebri.us>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import { PeripheralType } from 'j5-io-types';
import { IRaspiPinInfo } from './pinInfo';

export const FOURBPLUS: { [ wiringpi: number ]: IRaspiPinInfo } = {
  0: {
    pins: [
      'GPIO17',
      'FL1',
      'RTS0',
      'CE1-1',
      'RTS1',
      'P1-11'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 17
  },
  1: {
    pins: [
      'GPIO18',
      'PCM_CLK',
      'CE6-0',
      'CE1-0',
      'PWM0',
      'P1-12'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.PWM
    ],
    gpio: 18
  },
  2: {
    pins: [
      'GPIO27',
      'SD0_DAT3',
      'SD1_DAT3',
      'ARM_TMS',
      'CE6-1',
      'P1-13'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 27
  },
  3: {
    pins: [
      'GPIO22',
      'SD0_CLK',
      'SD1_CLK',
      'ARM_TRST',
      'SDA6',
      'P1-15'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 22
  },
  4: {
    pins: [
      'GPIO23',
      'SD0_CMD',
      'SD1_CMD',
      'ARM_RTCK',
      'SCL6',
      'P1-16'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 23
  },
  5: {
    pins: [
      'GPIO24',
      'SD0_DAT0',
      'SD1_DAT0',
      'ARM_TDO',
      'CE3-1',
      'P1-18'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 24
  },
  6: {
    pins: [
      'GPIO25',
      'SD0_DAT1',
      'SD1_DAT1',
      'ARM_TCK',
      'CE4-1',
      'P1-22'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 25
  },
  7: {
    pins: [
      'GPIO4',
      'GPCLK0',
      'CE4-0',
      'TXD3',
      'SDA3',
      'P1-7'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 4
  },
  8: {
    pins: [
      'GPIO2',
      'SDA1',
      'MOSI3',
      'CTS2',
      'SDA3',
      'P1-3'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 2
  },
  9: {
    pins: [
      'GPIO3',
      'SCL1',
      'SCLK3',
      'RTS2',
      'SCL3',
      'P1-5'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 3
  },
  10: {
    pins: [
      'GPIO8',
      'CE0-0',
      'TXD4',
      'SDA4',
      'P1-24'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 8
  },
  11: {
    pins: [
      'GPIO7',
      'CE0-1',
      'SCLK4',
      'RTS3',
      'SCL4',
      'P1-26'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 7
  },
  12: {
    pins: [
      'GPIO10',
      'MOSI0',
      'CTS4',
      'SDA5',
      'P1-19'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 10
  },
  13: {
    pins: [
      'GPIO9',
      'MISO0',
      'RXD4',
      'SCL4',
      'P1-21'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 9
  },
  14: {
    pins: [
      'GPIO11',
      'SCLK0',
      'RTS4',
      'SCL5',
      'P1-23'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 11
  },
  15: {
    pins: [
      'GPIO14',
      'TXD0',
      'MOSI5',
      'CTS5',
      'TXD1',
      'P1-8'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 14
  },
  16: {
    pins: [
      'GPIO15',
      'RXD0',
      'SCLK5',
      'RTS5',
      'RXD1',
      'P1-10'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 15
  },
  21: {
    pins: [
      'GPIO5',
      'GPCLK1',
      'MISO4',
      'RXD3',
      'SCL3',
      'P1-29'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 5
  },
  22: {
    pins: [
      'GPIO6',
      'GPCLK2',
      'MOSI4',
      'CTS3',
      'SDA4',
      'P1-31'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 6
  },
  23: {
    pins: [
      'GPIO13',
      'PWM1',
      'MISO5',
      'RXD5',
      'SCL5',
      'P1-33'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 13
  },
  24: {
    pins: [
      'GPIO19',
      'PCM_FS',
      'MISO6',
      'MISO1',
      'PWM1',
      'P1-35'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 19
  },
  25: {
    pins: [
      'GPIO26',
      'SD0_DAT2',
      'SD1_DAT2',
      'ARM_TDI',
      'CE5-1',
      'P1-37'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 26
  },
  26: {
    pins: [
      'GPIO12',
      'PWM0',
      'CE5-0',
      'TXD5',
      'SDA5',
      'P1-32'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 12
  },
  27: {
    pins: [
      'GPIO16',
      'FL0',
      'CTS0',
      'CE1-2',
      'CTS1',
      'P1-36'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 16
  },
  28: {
    pins: [
      'GPIO20',
      'PCM_DIN',
      'MOSI6',
      'MOSI1',
      'GPCLK0',
      'P1-38'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 20
  },
  29: {
    pins: [
      'GPIO21',
      'PCM_DOUT',
      'SCLK6',
      'SCLK1',
      'GPCLK1',
      'P1-40'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 21
  }
};
