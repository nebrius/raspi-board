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
const fs_1 = require("fs");
const b1_1 = require("./maps/b1");
const b2_1 = require("./maps/b2");
const bplus_1 = require("./maps/bplus");
const four_1 = require("./maps/four");
exports.VERSION_1_MODEL_A = 'rpi1_a';
exports.VERSION_1_MODEL_B_REV_1 = 'rpi1_b1';
exports.VERSION_1_MODEL_B_REV_2 = 'rpi1_b2';
exports.VERSION_1_MODEL_B_PLUS = 'rpi1_bplus';
exports.VERSION_1_MODEL_A_PLUS = 'rpi1_aplus';
exports.VERSION_1_MODEL_ZERO = 'rpi1_zero';
exports.VERSION_1_MODEL_ZERO_W = 'rpi1_zerow';
exports.VERSION_2_MODEL_B = 'rpi2_b';
exports.VERSION_3_MODEL_B = 'rpi3_b';
exports.VERSION_3_MODEL_B_PLUS = 'rpi3_bplus';
exports.VERSION_3_MODEL_A_PLUS = 'rpi3_aplus';
exports.VERSION_4_MODEL_B = 'rpi4_b';
exports.VERSION_UNKNOWN = 'unknown';
var j5_io_types_1 = require("j5-io-types");
exports.PeripheralType = j5_io_types_1.PeripheralType;
const BOARD_REVISIONS = {
    '0002': exports.VERSION_1_MODEL_B_REV_1,
    '0003': exports.VERSION_1_MODEL_B_REV_1,
    '0004': exports.VERSION_1_MODEL_B_REV_2,
    '0005': exports.VERSION_1_MODEL_B_REV_2,
    '0006': exports.VERSION_1_MODEL_B_REV_2,
    '0007': exports.VERSION_1_MODEL_A,
    '0008': exports.VERSION_1_MODEL_A,
    '0009': exports.VERSION_1_MODEL_A,
    '000d': exports.VERSION_1_MODEL_B_REV_2,
    '000e': exports.VERSION_1_MODEL_B_REV_2,
    '000f': exports.VERSION_1_MODEL_B_REV_2,
    '0010': exports.VERSION_1_MODEL_B_PLUS,
    '0012': exports.VERSION_1_MODEL_A_PLUS,
    '0013': exports.VERSION_1_MODEL_B_PLUS,
    '0015': exports.VERSION_1_MODEL_A_PLUS,
    '900021': exports.VERSION_1_MODEL_A_PLUS,
    '900032': exports.VERSION_1_MODEL_B_PLUS,
    '900092': exports.VERSION_1_MODEL_ZERO,
    '920092': exports.VERSION_1_MODEL_ZERO,
    '900093': exports.VERSION_1_MODEL_ZERO,
    '920093': exports.VERSION_1_MODEL_ZERO,
    '9000c1': exports.VERSION_1_MODEL_ZERO_W,
    '19000c1': exports.VERSION_1_MODEL_ZERO_W,
    'a01040': exports.VERSION_2_MODEL_B,
    'a01041': exports.VERSION_2_MODEL_B,
    'a21041': exports.VERSION_2_MODEL_B,
    'a22042': exports.VERSION_2_MODEL_B,
    'a02082': exports.VERSION_3_MODEL_B,
    'a22082': exports.VERSION_3_MODEL_B,
    'a32082': exports.VERSION_3_MODEL_B,
    'a52082': exports.VERSION_3_MODEL_B,
    'a020d3': exports.VERSION_3_MODEL_B_PLUS,
    '9020e0': exports.VERSION_3_MODEL_A_PLUS,
    'a03111': exports.VERSION_4_MODEL_B,
    'b03111': exports.VERSION_4_MODEL_B,
    'c03111': exports.VERSION_4_MODEL_B // 4GB RAM
};
// Initialize the board info
let procInfo = '';
let rev = '';
if (process.env.RASPI_IO_TEST_MODE) {
    rev = 'a21041';
    procInfo = `Revision:${rev}`;
}
else {
    try {
        procInfo = fs_1.readFileSync('/proc/cpuinfo').toString();
        const revMatch = procInfo.match(/Revision\s*:\s*(.*)/);
        if (!revMatch) {
            console.warn('Unable to parse revision information in /proc/cpuinfo');
        }
        else {
            rev = revMatch[1];
        }
    }
    catch (e) {
        console.warn(`Unable to read /proc/cpuinfo file. Are you running this code on a Raspberry Pi? Error: ${e}`);
    }
}
// If the board has been overclocked, the revision is modified, so clear it here
if (/10[0-9a-z]{5}/.test(rev)) { // Check for RPi 1 overclock
    rev = rev.substr(-4);
}
else if (/1a[0-9a-z]{5}/.test(rev)) { // Check for RPi 2 overclock
    rev = rev.substr(-6);
}
let pins;
switch (BOARD_REVISIONS[rev]) {
    case exports.VERSION_1_MODEL_A:
        // Information is scarce, and no one has complained about it not being supported
        throw new Error('Raspberry Pi 1 Model A boards are not supported.');
    case exports.VERSION_1_MODEL_B_REV_1:
        pins = b1_1.B1;
        break;
    case exports.VERSION_1_MODEL_B_REV_2:
        pins = b2_1.B2;
        break;
    case exports.VERSION_1_MODEL_ZERO:
    case exports.VERSION_1_MODEL_ZERO_W:
    case exports.VERSION_1_MODEL_A_PLUS:
    case exports.VERSION_1_MODEL_B_PLUS:
    case exports.VERSION_2_MODEL_B:
    case exports.VERSION_3_MODEL_B:
    case exports.VERSION_3_MODEL_B_PLUS:
    case exports.VERSION_3_MODEL_A_PLUS:
        pins = bplus_1.BPLUS;
        break;
    case exports.VERSION_4_MODEL_B:
        pins = four_1.FOURBPLUS;
        break;
    default:
        console.info(`Unknown board revision ${rev}, assuming Raspberry Pi Zero/2/3 pinout. ` +
            `Unless you are running a compute module or very old RPi you can most likely ignore this warning. ` +
            `Please report this board revision in a GitHub issue at https://github.com/nebrius/raspi-board.`);
        pins = bplus_1.BPLUS;
        break;
}
// Create the aliases
const aliases = {};
for (const pin in pins) {
    if (pins.hasOwnProperty(pin)) {
        const pinAliases = pins[pin].pins;
        for (const pinAlias of pinAliases) {
            aliases[pinAlias] = parseInt(pin, 10);
        }
    }
}
// Create the Wiring Pi to PIGPIO mapping
const pigpioMapping = {};
for (const pin in pins) {
    if (pins.hasOwnProperty(pin)) {
        pigpioMapping[pin] = pins[pin].gpio;
    }
}
function setBoardRev(newRev) {
    if (process.env.RASPI_IO_TEST_MODE) {
        rev = newRev;
    }
    else {
        throw new Error('setBoardRev cannot be used outside of test mode');
    }
}
exports.setBoardRev = setBoardRev;
function getBoardRevision() {
    return BOARD_REVISIONS[rev] || exports.VERSION_UNKNOWN;
}
exports.getBoardRevision = getBoardRevision;
function getPins() {
    return pins;
}
exports.getPins = getPins;
function getPinNumber(alias) {
    if (typeof alias !== 'number' && typeof alias !== 'string') {
        return null;
    }
    alias = alias.toString();
    if (Object.keys(pins).indexOf(alias) !== -1) {
        alias = parseInt(alias, 10);
    }
    else {
        alias = aliases[alias];
    }
    if (typeof alias === 'undefined') {
        return null;
    }
    return alias;
}
exports.getPinNumber = getPinNumber;
function getGpioNumber(alias) {
    const wiringpi = getPinNumber(alias);
    if (wiringpi === null) {
        return null;
    }
    return pigpioMapping[wiringpi];
}
exports.getGpioNumber = getGpioNumber;
//# sourceMappingURL=index.js.map