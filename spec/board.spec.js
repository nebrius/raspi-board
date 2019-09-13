"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const __1 = require("..");
describe('Raspi Board', () => {
    it('Expects the correct board revision to be determined', () => {
        const revision = __1.getBoardRevision();
        expect(revision).toEqual(__1.VERSION_2_MODEL_B);
    });
    it('sets up the proper pin aliases and modes', () => {
        const pins = __1.getPins();
        expect(pins[8].pins.length).toEqual(3);
        expect(pins[8].pins.indexOf('GPIO2')).not.toEqual(-1);
        expect(pins[8].pins.indexOf('SDA0')).not.toEqual(-1);
        expect(pins[8].pins.indexOf('P1-3')).not.toEqual(-1);
        expect(pins[8].peripherals.length).toEqual(2);
        expect(pins[8].peripherals.indexOf(__1.PeripheralType.GPIO)).not.toEqual(-1);
        expect(pins[8].peripherals.indexOf(__1.PeripheralType.I2C)).not.toEqual(-1);
    });
    it('resolves pins correctly', () => {
        expect(__1.getPinNumber('GPIO2')).toEqual(8);
        expect(__1.getPinNumber('TXD0')).toEqual(15);
        expect(__1.getPinNumber('P1-12')).toEqual(1);
        expect(__1.getPinNumber(10)).toEqual(10);
        expect(__1.getPinNumber(0)).toEqual(0);
        expect(__1.getPinNumber('10')).toEqual(10);
        expect(__1.getPinNumber(50)).toBeNull();
        expect(__1.getPinNumber('fake')).toBeNull();
    });
    it('resolves GPIO pin numbers correctly', () => {
        expect(__1.getGpioNumber('GPIO2')).toEqual(2);
        expect(__1.getGpioNumber('TXD0')).toEqual(14);
        expect(__1.getGpioNumber('P1-12')).toEqual(18);
        expect(__1.getGpioNumber(10)).toEqual(8);
        expect(__1.getGpioNumber(0)).toEqual(17);
        expect(__1.getGpioNumber('10')).toEqual(8);
        expect(__1.getGpioNumber(50)).toBeNull();
        expect(__1.getGpioNumber('fake')).toBeNull();
    });
    it('correctly does not resolve invalid pin numbers', () => {
        expect(__1.getPinNumber()).toBeNull();
        expect(__1.getPinNumber([])).toBeNull();
        expect(__1.getPinNumber({})).toBeNull();
        expect(__1.getPinNumber(() => {
            // Do nothing
        })).toBeNull();
        expect(__1.getPinNumber(/foo/)).toBeNull();
    });
    it('correctly has the proper peripheral number to match each alias', () => {
        const revs = ['0002', '0004', 'a020d3', 'a03111'];
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
            __1.setBoardRev(rev);
            rev = revs.pop();
            const pins = __1.getPins();
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
                    let match = headerAliasRegex.exec(pinAlias);
                    if (match) {
                        headerAliasFound = true;
                        continue;
                    }
                    // Check for the GPIO alias, e.g. GPIO4
                    match = gpioAliasRegex.exec(pinAlias);
                    if (match) {
                        gpioAliasFound = true;
                        expect(pinInfo.gpio).toEqual(parseInt(match[1], 10));
                        continue;
                    }
                    match = pwmAliasRegex.exec(pinAlias);
                    if (match) {
                        expect(pinInfo.pwm).toEqual(parseInt(match[1], 10));
                        continue;
                    }
                    // Check for I2C aliases
                    match = i2cSDAAliasRegex.exec(pinAlias);
                    if (match) {
                        expect(pinInfo.i2c).toEqual(parseInt(match[1], 10));
                        continue;
                    }
                    match = i2cSCLAliasRegex.exec(pinAlias);
                    if (match) {
                        expect(pinInfo.i2c).toEqual(parseInt(match[1], 10));
                        continue;
                    }
                    // Check for UART aliases
                    match = uartTXAliasRegex.exec(pinAlias);
                    if (match) {
                        expect(pinInfo.uart).toEqual(parseInt(match[1], 10));
                        continue;
                    }
                    match = uartRXAliasRegex.exec(pinAlias);
                    if (match) {
                        expect(pinInfo.uart).toEqual(parseInt(match[1], 10));
                        continue;
                    }
                    // Check for SPI aliases
                    match = spiMISOAliasRegex.exec(pinAlias);
                    if (match) {
                        expect(pinInfo.spi).toEqual(parseInt(match[1], 10));
                        continue;
                    }
                    match = spiMOSIAliasRegex.exec(pinAlias);
                    if (match) {
                        expect(pinInfo.spi).toEqual(parseInt(match[1], 10));
                        continue;
                    }
                    match = spiSCLKliasRegex.exec(pinAlias);
                    if (match) {
                        expect(pinInfo.spi).toEqual(parseInt(match[1], 10));
                        continue;
                    }
                    match = spiCEliasRegex.exec(pinAlias);
                    if (match) {
                        expect(pinInfo.spi).toEqual(parseInt(match[1], 10));
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
//# sourceMappingURL=board.spec.js.map