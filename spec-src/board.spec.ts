/*
The MIT License (MIT)

Copyright (c) 2014-2017 Bryan Hughes <bryan@nebri.us>

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

import 'jasmine';

import {
  getBoardRevision,
  getPins,
  getPinNumber,
  getGpioNumber,
  setBoardRev,
  PeripheralType,
  VERSION_1_MODEL_B_REV_1,
  VERSION_2_MODEL_B,
  VERSION_4_MODEL_B
} from '..';

describe('Raspi Board', () => {

  it('Expects the correct board revision to be determined', () => {
    setBoardRev('0002');
    let revision = getBoardRevision();
    expect(revision).toEqual(VERSION_1_MODEL_B_REV_1);

    setBoardRev('a01040');
    revision = getBoardRevision();
    expect(revision).toEqual(VERSION_2_MODEL_B);

    setBoardRev('b03111');
    revision = getBoardRevision();
    expect(revision).toEqual(VERSION_4_MODEL_B);
  });

  it('sets up the proper pin aliases and modes', () => {
    const pins = getPins();
    expect(pins[8].pins.length).toEqual(3);
    expect(pins[8].pins.indexOf('GPIO2')).not.toEqual(-1);
    expect(pins[8].pins.indexOf('SDA0')).not.toEqual(-1);
    expect(pins[8].pins.indexOf('P1-3')).not.toEqual(-1);
    expect(pins[8].peripherals.length).toEqual(2);
    expect(pins[8].peripherals.indexOf(PeripheralType.GPIO)).not.toEqual(-1);
    expect(pins[8].peripherals.indexOf(PeripheralType.I2C)).not.toEqual(-1);
  });

  it('resolves pins correctly', () => {
    expect(getPinNumber('GPIO2')).toEqual(8);
    expect(getPinNumber('TXD0')).toEqual(15);
    expect(getPinNumber('P1-12')).toEqual(1);
    expect(getPinNumber(10)).toEqual(10);
    expect(getPinNumber(0)).toEqual(0);
    expect(getPinNumber('10')).toEqual(10);
    expect(getPinNumber(50)).toBeNull();
    expect(getPinNumber('fake')).toBeNull();
  });

  it('resolves GPIO pin numbers correctly', () => {
    expect(getGpioNumber('GPIO2')).toEqual(2);
    expect(getGpioNumber('TXD0')).toEqual(14);
    expect(getGpioNumber('P1-12')).toEqual(18);
    expect(getGpioNumber(10)).toEqual(8);
    expect(getGpioNumber(0)).toEqual(17);
    expect(getGpioNumber('10')).toEqual(8);
    expect(getGpioNumber(50)).toBeNull();
    expect(getGpioNumber('fake')).toBeNull();
  });

  it('correctly does not resolve invalid pin numbers', () => {
    expect((getPinNumber as any)()).toBeNull();
    expect((getPinNumber as any)([])).toBeNull();
    expect((getPinNumber as any)({})).toBeNull();
    expect((getPinNumber as any)(() => {
      // Do nothing
    })).toBeNull();
    expect((getPinNumber as any)(/foo/)).toBeNull();
  });

  it('correctly has the proper peripheral number to match each alias', () => {
    const revs = [ '0002', '0004', 'a020d3', 'a03111' ];

    const headerAliasRegex = /^P[0-9]\-[0-9][0-9]?$/;
    const gpioAliasRegex = /^GPIO([0-9][0-9]?)$/;

    const pwmAliasRegex = /^PWM([0-9])$/;

    const i2cSDAAliasRegex = /^SDA([0-9])$/;
    const i2cSCLAliasRegex = /^SCL([0-9])$/;

    const uartTXAliasRegex = /^TXD([0-9])$/;
    const uartRXAliasRegex = /^RXD([0-9])$/;

    const spiMISOAliasRegex = /^MISO([0-9])$/;
    const spiMOSIAliasRegex = /^MOSI([0-9])$/;
    const spiSCLKliasRegex = /^SCLK([0-9])$/;
    const spiCEliasRegex = /^CE[0-9]-([0-9])$/;

    let rev = revs.pop();
    while (rev) {
      setBoardRev(rev);
      rev = revs.pop();
      const pins = getPins();
      for (const pinNumber in pins) {
        if (!pins.hasOwnProperty(pinNumber)) {
          continue;
        }
        const pinInfo = pins[pinNumber];
        let headerAliasFound = false;
        let gpioAliasFound = false;
        for (const pinAlias of pinInfo.pins) {

          // Check that we have the expected number of peripheral types. We do +1 to account for P#-## extra alias
          expect(pinInfo.pins.length).toEqual(pinInfo.peripherals.length + 1);

          // Check for the pin header alias, e.g. P1-1
          const headerMatch = headerAliasRegex.exec(pinAlias);
          if (headerMatch) {
            headerAliasFound = true;
            continue;
          }

          function checkAlias(regex: RegExp, prop: 'gpio' | 'pwm' | 'i2c' | 'uart' | 'spi'): boolean {
            const match = regex.exec(pinAlias);
            if (!match) {
              return false;
            }
            const pinNum = parseInt(match[1], 10);
            const peripheralNum = pinInfo[prop];
            expect(peripheralNum).toEqual(
              pinNum,
              `Expected alias ${pinAlias} to have accompanying ${prop} number ${pinNum}` +
              `, but instead found ${peripheralNum}`);
            return true;
          }

          // Check for the GPIO alias, e.g. GPIO4
          if (checkAlias(gpioAliasRegex, 'gpio')) {
            gpioAliasFound = true;
            continue;
          }

          // Check for the PWM alias, e.g. PWM0
          if (checkAlias(pwmAliasRegex, 'pwm')) {
            continue;
          }

          // Check for I2C aliases, e.g. SDA0 or SCL0
          if (checkAlias(i2cSDAAliasRegex, 'i2c') || checkAlias(i2cSCLAliasRegex, 'i2c')) {
            continue;
          }

          // Check for UART aliases, e.g. TXD0 or RXD0
          if (checkAlias(uartTXAliasRegex, 'uart') || checkAlias(uartRXAliasRegex, 'uart')) {
            continue;
          }

          // Check for SPI aliases, e.g. MISO0, MOSI0, SCLK0, or CE0-0
          if (checkAlias(spiMISOAliasRegex, 'spi') || checkAlias(spiMOSIAliasRegex, 'spi') ||
            checkAlias(spiSCLKliasRegex, 'spi') ||checkAlias(spiCEliasRegex, 'spi')
          ) {
            continue;
          }

          fail(`Alias ${pinAlias} did not match any known test regex`);
        }

        // Make sure the header alias and gpio alias were found
        expect(headerAliasFound).toBeTruthy();
        expect(gpioAliasFound).toBeTruthy();
      }
    }
    expect(false).toBe(true);
  });

});
