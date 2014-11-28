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
  0: [
    'GPIO17',
    'P1-11',
    '11'
  ],
  1: [
    'GPIO18',
    'P1-12',
    '12'
  ],
  2: [
    'GPIO21',
    'P1-13',
    '13'
  ],
  3: [
    'GPIO22',
    'P1-15',
    '15'
  ],
  4: [
    'GPIO23',
    'P1-16',
    '16'
  ],
  5: [
    'GPIO24',
    'P1-18',
    '18'
  ],
  6: [
    'GPIO25',
    'P1-22',
    '22'
  ],
  7: [
    'GPIO4',
    'P1-7',
    '7'
  ],
  8: [
    'GPIO0',
    'SDA',
    'P1-3',
    '3'
  ],
  9: [
    'GPIO1',
    'SCL',
    'P1-5',
    '5'
  ],
  10: [
    'GPIO8',
    'P1-24',
    '24'
  ],
  11: [
    'GPIO7',
    'P1-26',
    '26'
  ],
  12: [
    'GPIO10',
    'MOSI',
    'P1-19',
    '19'
  ],
  13: [
    'GPIO9',
    'MISO',
    'P1-21',
    '21'
  ],
  14: [
    'GPIO11',
    'P1-23',
    '23'
  ],
  15: [
    'GPIO14',
    'TXD',
    'P1-8',
    '8'
  ],
  16: [
    'GPIO15',
    'RXD',
    'P1-10',
    '10'
  ]
};

var B2 = {
  0: [
    'GPIO17',
    'P1-11',
    '11'
  ],
  1: [
    'GPIO18',
    'P1-12',
    '12'
  ],
  2: [
    'GPIO27',
    'P1-13',
    '13'
  ],
  3: [
    'GPIO22',
    'P1-15',
    '15'
  ],
  4: [
    'GPIO23',
    'P1-16',
    '16'
  ],
  5: [
    'GPIO24',
    'P1-18',
    '18'
  ],
  6: [
    'GPIO25',
    'P1-22',
    '22'
  ],
  7: [
    'GPIO4',
    'P1-7',
    '7'
  ],
  8: [
    'GPIO2',
    'SDA',
    'P1-3',
    '3'
  ],
  9: [
    'GPIO3',
    'SCL',
    'P1-5',
    '5'
  ],
  10: [
    'GPIO8',
    'P1-24',
    '24'
  ],
  11: [
    'GPIO7',
    'P1-26',
    '26'
  ],
  12: [
    'GPIO10',
    'MOSI',
    'P1-19',
    '19'
  ],
  13: [
    'GPIO9',
    'MISO',
    'P1-21',
    '21'
  ],
  14: [
    'GPIO11',
    'P1-23',
    '23'
  ],
  15: [
    'GPIO14',
    'TXD',
    'P1-8',
    '8'
  ],
  16: [
    'GPIO15',
    'RXD',
    'P1-10',
    '10'
  ]
  // TODO: 17-20 are on P5
};

var BPLUS = {
  0: [
    'GPIO17',
    'P1-11',
    '11'
  ],
  1: [
    'GPIO18',
    'P1-12',
    '12'
  ],
  2: [
    'GPIO27',
    'P1-13',
    '13'
  ],
  3: [
    'GPIO22',
    'P1-15',
    '15'
  ],
  4: [
    'GPIO23',
    'P1-16',
    '16'
  ],
  5: [
    'GPIO24',
    'P1-18',
    '18'
  ],
  6: [
    'GPIO25',
    'P1-22',
    '22'
  ],
  7: [
    'GPIO4',
    'P1-7',
    '7'
  ],
  8: [
    'GPIO2',
    'SDA',
    'P1-3',
    '3'
  ],
  9: [
    'GPIO3',
    'SCL',
    'P1-5',
    '5'
  ],
  10: [
    'GPIO8',
    'P1-24',
    '24'
  ],
  11: [
    'GPIO7',
    'P1-26',
    '26'
  ],
  12: [
    'GPIO10',
    'MOSI',
    'P1-19',
    '19'
  ],
  13: [
    'GPIO9',
    'MISO',
    'P1-21',
    '21'
  ],
  14: [
    'GPIO11',
    'P1-23',
    '23'
  ],
  15: [
    'GPIO14',
    'TXD',
    'P1-8',
    '8'
  ],
  16: [
    'GPIO15',
    'RXD',
    'P1-10',
    '10'
  ],
  // TODO: 17-20 are on P5
  21: [
    'GPIO5',
    'P1-29',
    '29'
  ],
  22: [
    'GPIO6',
    'P1-31',
    '31'
  ],
  23: [
    'GPIO13',
    'P1-33',
    '33'
  ],
  24: [
    'GPIO19',
    'P1-35',
    '35'
  ],
  25: [
    'GPIO26',
    'P1-37',
    '37'
  ],
  26: [
    'GPIO12',
    'P1-32',
    '32'
  ],
  27: [
    'GPIO16',
    'P1-36',
    '36'
  ],
  28: [
    'GPIO20',
    'P1-38',
    '38'
  ],
  29: [
    'GPIO21',
    'P1-40',
    '40'
  ]
  // TODO: 30 and 31 are listed in the Wiring Pi source, mapped to GPIO0 and 1,
  // but I don't know where they are exposed, if at all
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
