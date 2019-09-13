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

export const B2: { [ wiringpi: number ]: IRaspiPinInfo } = {
  0: {
    pins: [
      'GPIO17',
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
      'PWM0',
      'P1-12'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.PWM
    ],
    gpio: 18,
    pwm: 0
  },
  2: {
    pins: [
      'GPIO27',
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
      'SDA0',
      'P1-3'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.I2C
    ],
    gpio: 2,
    i2c: 0
  },
  9: {
    pins: [
      'GPIO3',
      'SCL0',
      'P1-5'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.I2C
    ],
    gpio: 3,
    i2c: 0
  },
  10: {
    pins: [
      'GPIO8',
      'CE0-0',
      'P1-24'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.SPI
    ],
    gpio: 8,
    spi: 0
  },
  11: {
    pins: [
      'GPIO7',
      'CE0-1',
      'P1-26'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.SPI
    ],
    gpio: 7,
    spi: 0
  },
  12: {
    pins: [
      'GPIO10',
      'MOSI0',
      'P1-19'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.SPI
    ],
    gpio: 10,
    spi: 0
  },
  13: {
    pins: [
      'GPIO9',
      'MISO0',
      'P1-21'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.SPI
    ],
    gpio: 9,
    spi: 0
  },
  14: {
    pins: [
      'GPIO11',
      'SCLK0',
      'P1-23'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.SPI
    ],
    gpio: 11,
    spi: 0
  },
  15: {
    pins: [
      'GPIO14',
      'TXD0',
      'P1-8'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.UART
    ],
    gpio: 14,
    uart: 0
  },
  16: {
    pins: [
      'GPIO15',
      'RXD0',
      'P1-10'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.UART
    ],
    gpio: 15,
    uart: 0
  },
  17: {
    pins: [
      'GPIO28',
      'P5-3'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 28
  },
  18: {
    pins: [
      'GPIO29',
      'P5-4'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 29
  },
  19: {
    pins: [
      'GPIO30',
      'P5-5'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 30
  },
  20: {
    pins: [
      'GPIO31',
      'P5-6'
    ],
    peripherals: [
      PeripheralType.GPIO
    ],
    gpio: 31
  }
};
