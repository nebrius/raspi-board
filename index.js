/*
The MIT License (MIT)

Copyright (c) 2014 Bryan Hughes <bryan@theoreticalideations.com> (http://theoreticalideations.com)

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

var fs = require('fs');
var revision;
var pins;
var aliases = {};

// Version lookup info obtained from:
// http://raspberryalphaomega.org.uk/2013/02/06/automatic-raspberry-pi-board-revision-detection-model-a-b1-and-b2/
var BOARD_REVISIONS = {
  0x00: 'Unknown',
  0x02: 'B1',
  0x03: 'B1',
  0x04: 'B2',
  0x05: 'B2',
  0x06: 'B2',
  0x07: 'A',
  0x08: 'A',
  0x09: 'A',
  0x0D: 'B2',
  0x0E: 'B2',
  0x0F: 'B2',
  0x10: 'BPLUS',
  0x12: 'APLUS'
};

var B1 = {
  1: [],
  2: [],
  3: [
    'GPIO0',
    'SDA'
  ],
  4: [],
  5: [
    'GPIO1',
    'SCL'
  ],
  6: [],
  7: [
    'GPIO4'
  ],
  8: [
    'GPIO14',
    'TXD'
  ],
  9: [],
  10: [
    'GPIO15',
    'RXD'
  ],
  11: [
    'GPIO17'
  ],
  12: [
    'GPIO18'
  ],
  13: [
    'GPIO21'
  ],
  14: [],
  15: [
    'GPIO22'
  ],
  16: [
    'GPIO23'
  ],
  17: [],
  18: [
    'GPIO24'
  ],
  19: [
    'GPIO10',
    'MOSI'
  ],
  20: [],
  21: [
    'GPIO9',
    'MISO'
  ],
  22: [
    'GPIO25'
  ],
  23: [
    'GPIO11',
    'SCLK'
  ],
  24: [
    'GPIO8',
    'CIE'
  ],
  25: [],
  26: [
    'GPIO7',
    'CIE'
  ]
};

var B2 = {
  1: [],
  2: [],
  3: [
    'GPIO2',
    'SDA'
  ],
  4: [],
  5: [
    'GPIO3',
    'SCL'
  ],
  6: [],
  7: [
    'GPIO4'
  ],
  8: [
    'GPIO14',
    'TXD'
  ],
  9: [],
  10: [
    'GPIO15',
    'RXD'
  ],
  11: [
    'GPIO17'
  ],
  12: [
    'GPIO18'
  ],
  13: [
    'GPIO27'
  ],
  14: [],
  15: [
    'GPIO22'
  ],
  16: [
    'GPIO23'
  ],
  17: [],
  18: [
    'GPIO24'
  ],
  19: [
    'GPIO10',
    'MOSI'
  ],
  20: [],
  21: [
    'GPIO9',
    'MISO'
  ],
  22: [
    'GPIO25'
  ],
  23: [
    'GPIO11',
    'SCLK'
  ],
  24: [
    'GPIO8',
    'CIE'
  ],
  25: [],
  26: [
    'GPIO7',
    'CIE'
  ]
};

var BPLUS = {
  1: [],
  2: [],
  3: [
    'GPIO0',
    'SDA'
  ],
  4: [],
  5: [
    'GPIO1',
    'SCL'
  ],
  6: [],
  7: [
    'GPIO4'
  ],
  8: [
    'GPIO14',
    'TXD'
  ],
  9: [],
  10: [
    'GPIO15',
    'RXD'
  ],
  11: [
    'GPIO17'
  ],
  12: [
    'GPIO18'
  ],
  13: [
    'GPIO21'
  ],
  14: [],
  15: [
    'GPIO22'
  ],
  16: [
    'GPIO23'
  ],
  17: [],
  18: [
    'GPIO24'
  ],
  19: [
    'GPIO10',
    'MOSI'
  ],
  20: [],
  21: [
    'GPIO9',
    'MISO'
  ],
  22: [
    'GPIO25'
  ],
  23: [
    'GPIO11',
    'SCLK'
  ],
  24: [
    'GPIO8',
    'CIE'
  ],
  25: [],
  26: [
    'GPIO7',
    'CIE'
  ],
  27: [],
  28: [],
  29: [
    'GPIO5'
  ],
  30: [],
  31: [
    'GPIO6'
  ],
  32: [
    'GPIO12'
  ],
  33: [
    'GPIO13'
  ],
  34: [],
  35: [
    'GPIO12'
  ],
  36: [],
  37: [
    'GPIO26'
  ],
  38: [
    'GPIO20'
  ],
  39: [],
  40: [
    'GPIO21'
  ]
};

// Initialize the board info
var procInfo;
if (global._raspiTest) {
  procInfo = 'Revision:0D';
} else {
  procInfo = fs.readFileSync('/proc/cpuinfo').toString();
}
var rev = procInfo.match(/Revision\s*:\s*(.*)/);
rev = parseInt(rev && rev[1] || '0', 16);
switch(BOARD_REVISIONS[rev]) {
  case 'A':
    // Information is scarce, going to have to reverse-engineer the
    // schematics to figure out pinouts, if any actually cares about the A
    throw new Error('Rev A boards are not yet supported.');
    break;
  case 'B1':
    pins = B1;
    break;
  case 'B2':
    pins = B2;
    break;
  case 'APLUS':
  case 'BPLUS':
    pins = BPLUS;
    break;
  default:
    throw new Error('Unknown board revision ' + revision);
}

// Create the aliases
for (var pin in pins) {
  aliases[pin] = parseInt(pin);
  for (var i = 0; i < pins[pin].length; i++) {
    aliases[pins[pin][i]] = parseInt(pin);
  }
}

module.exports.getPins = function getPins() {
  return pins;
};

module.exports.getPinNumber = function getPinNumber(alias) {
  return aliases[alias];
};
