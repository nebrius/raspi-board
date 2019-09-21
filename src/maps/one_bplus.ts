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

export const BPLUS: { [ wiringpi: number ]: IRaspiPinInfo } = {
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
    pwm: [ 0 ]
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
    gpio: 2
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
    gpio: 3
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
    spi: [ 0 ]
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
    spi: [ 0 ]
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
    gpio: 10
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
    gpio: 9
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
    gpio: 11
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
    gpio: 14
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
    gpio: 15
  },
  21: {
    pins: [
      'GPIO5',
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
      'P1-33',
      'PWM1'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.PWM
    ],
    gpio: 13,
    pwm: [ 1 ]
  },
  24: {
    pins: [
      'GPIO19',
      'PWM1',
      'MISO1',
      'P1-35'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.PWM,
      PeripheralType.SPI
    ],
    gpio: 19,
    pwm: [ 1 ]
  },
  25: {
    pins: [
      'GPIO26',
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
      'P1-32'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.PWM
    ],
    gpio: 12,
    pwm: [ 0 ]
  },
  27: {
    pins: [
      'GPIO16',
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
      'MOSI1',
      'P1-38'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.SPI
    ],
    gpio: 20
  },
  29: {
    pins: [
      'GPIO21',
      'SCLK1',
      'P1-40'
    ],
    peripherals: [
      PeripheralType.GPIO,
      PeripheralType.SPI
    ],
    gpio: 21
  }
};
