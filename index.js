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

import fs from 'fs';

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
  0: {
    pins: [
      'GPIO17',
      'P1-11'
    ],
    peripherals: [
      'gpio'
    ]
  },
  1: {
    pins: [
      'GPIO18',
      'PWM0',
      'P1-12'
    ],
    peripherals: [
      'gpio',
      'pwm'
    ]
  },
  2: {
    pins: [
      'GPIO21',
      'P1-13'
    ],
    peripherals: [
      'gpio'
    ]
  },
  3: {
    pins: [
      'GPIO22',
      'P1-15'
    ],
    peripherals: [
      'gpio'
    ]
  },
  4: {
    pins: [
      'GPIO23',
      'P1-16'
    ],
    peripherals: [
      'gpio'
    ]
  },
  5: {
    pins: [
      'GPIO24',
      'P1-18'
    ],
    peripherals: [
      'gpio'
    ]
  },
  6: {
    pins: [
      'GPIO25',
      'P1-22'
    ],
    peripherals: [
      'gpio'
    ]
  },
  7: {
    pins: [
      'GPIO4',
      'P1-7'
    ],
    peripherals: [
      'gpio'
    ]
  },
  8: {
    pins: [
      'GPIO0',
      'SDA0',
      'P1-3'
    ],
    peripherals: [
      'gpio',
      'i2c'
    ]
  },
  9: {
    pins: [
      'GPIO1',
      'SCL0',
      'P1-5'
    ],
    peripherals: [
      'gpio',
      'i2c'
    ]
  },
  10: {
    pins: [
      'GPIO8',
      'P1-24',
      'CE0'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  11: {
    pins: [
      'GPIO7',
      'P1-26'
    ],
    peripherals: [
      'gpio'
    ]
  },
  12: {
    pins: [
      'GPIO10',
      'MOSI0',
      'P1-19'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  13: {
    pins: [
      'GPIO9',
      'MISO0',
      'P1-21'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  14: {
    pins: [
      'GPIO11',
      'SCLK0',
      'P1-23'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  15: {
    pins: [
      'GPIO14',
      'TXD0',
      'P1-8'
    ],
    peripherals: [
      'gpio',
      'uart'
    ]
  },
  16: {
    pins: [
      'GPIO15',
      'RXD0',
      'P1-10'
    ],
    peripherals: [
      'gpio',
      'uart'
    ]
  }
};

var B2 = {
  0: {
    pins: [
      'GPIO17',
      'P1-11'
    ],
    peripherals: [
      'gpio'
    ]
  },
  1: {
    pins: [
      'GPIO18',
      'PWM0',
      'P1-12'
    ],
    peripherals: [
      'gpio',
      'pwm'
    ]
  },
  2: {
    pins: [
      'GPIO27',
      'P1-13'
    ],
    peripherals: [
      'gpio'
    ]
  },
  3: {
    pins: [
      'GPIO22',
      'P1-15'
    ],
    peripherals: [
      'gpio'
    ]
  },
  4: {
    pins: [
      'GPIO23',
      'P1-16'
    ],
    peripherals: [
      'gpio'
    ]
  },
  5: {
    pins: [
      'GPIO24',
      'P1-18'
    ],
    peripherals: [
      'gpio'
    ]
  },
  6: {
    pins: [
      'GPIO25',
      'P1-22'
    ],
    peripherals: [
      'gpio'
    ]
  },
  7: {
    pins: [
      'GPIO4',
      'P1-7'
    ],
    peripherals: [
      'gpio'
    ]
  },
  8: {
    pins: [
      'GPIO2',
      'SDA0',
      'P1-3'
    ],
    peripherals: [
      'gpio',
      'i2c'
    ]
  },
  9: {
    pins: [
      'GPIO3',
      'SCL0',
      'P1-5'
    ],
    peripherals: [
      'gpio',
      'i2c'
    ]
  },
  10: {
    pins: [
      'GPIO8',
      'CE0',
      'P1-24'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  11: {
    pins: [
      'GPIO7',
      'P1-26'
    ],
    peripherals: [
      'gpio'
    ]
  },
  12: {
    pins: [
      'GPIO10',
      'MOSI0',
      'P1-19'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  13: {
    pins: [
      'GPIO9',
      'MISO0',
      'P1-21'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  14: {
    pins: [
      'GPIO11',
      'SCLK0',
      'P1-23'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  15: {
    pins: [
      'GPIO14',
      'TXD0',
      'P1-8'
    ],
    peripherals: [
      'gpio',
      'uart'
    ]
  },
  16: {
    pins: [
      'GPIO15',
      'RXD0',
      'P1-10'
    ],
    peripherals: [
      'gpio',
      'uart'
    ]
  },
  17: {
    pins: [
      'GPIO28',
      'P5-3'
    ],
    peripherals: [
      'gpio'
    ]
  },
  18: {
    pins: [
      'GPIO29',
      'P5-4'
    ],
    peripherals: [
      'gpio'
    ]
  },
  19: {
    pins: [
      'GPIO30',
      'P5-5'
    ],
    peripherals: [
      'gpio'
    ]
  },
  20: {
    pins: [
      'GPIO31',
      'P5-6'
    ],
    peripherals: [
      'gpio'
    ]
  }
};

var BPLUS = {
  0: {
    pins: [
      'GPIO17',
      'P1-11'
    ],
    peripherals: [
      'gpio'
    ]
  },
  1: {
    pins: [
      'GPIO18',
      'PWM0',
      'P1-12'
    ],
    peripherals: [
      'gpio',
      'pwm'
    ]
  },
  2: {
    pins: [
      'GPIO27',
      'P1-13'
    ],
    peripherals: [
      'gpio'
    ]
  },
  3: {
    pins: [
      'GPIO22',
      'P1-15'
    ],
    peripherals: [
      'gpio'
    ]
  },
  4: {
    pins: [
      'GPIO23',
      'P1-16'
    ],
    peripherals: [
      'gpio'
    ]
  },
  5: {
    pins: [
      'GPIO24',
      'P1-18'
    ],
    peripherals: [
      'gpio'
    ]
  },
  6: {
    pins: [
      'GPIO25',
      'P1-22'
    ],
    peripherals: [
      'gpio'
    ]
  },
  7: {
    pins: [
      'GPIO4',
      'P1-7'
    ],
    peripherals: [
      'gpio'
    ]
  },
  8: {
    pins: [
      'GPIO2',
      'SDA0',
      'P1-3'
    ],
    peripherals: [
      'gpio',
      'i2c'
    ]
  },
  9: {
    pins: [
      'GPIO3',
      'SCL0',
      'P1-5'
    ],
    peripherals: [
      'gpio',
      'i2c'
    ]
  },
  10: {
    pins: [
      'GPIO8',
      'CE0',
      'P1-24'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  11: {
    pins: [
      'GPIO7',
      'CE1',
      'P1-26'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  12: {
    pins: [
      'GPIO10',
      'MOSI0',
      'P1-19'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  13: {
    pins: [
      'GPIO9',
      'MISO0',
      'P1-21'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  14: {
    pins: [
      'GPIO11',
      'SCLK0',
      'P1-23'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  15: {
    pins: [
      'GPIO14',
      'TXD0',
      'P1-8'
    ],
    peripherals: [
      'gpio',
      'uart'
    ]
  },
  16: {
    pins: [
      'GPIO15',
      'RXD0',
      'P1-10'
    ],
    peripherals: [
      'gpio',
      'uart'
    ]
  },
  21: {
    pins: [
      'GPIO5',
      'P1-29'
    ],
    peripherals: [
      'gpio'
    ]
  },
  22: {
    pins: [
      'GPIO6',
      'P1-31'
    ],
    peripherals: [
      'gpio'
    ]
  },
  23: {
    pins: [
      'GPIO13',
      'P1-33'
    ],
    peripherals: [
      'gpio'
    ]
  },
  24: {
    pins: [
      'GPIO19',
      'PWM1',
      'MISO1',
      'P1-35'
    ],
    peripherals: [
      'gpio',
      'pwm',
      'spi'
    ]
  },
  25: {
    pins: [
      'GPIO26',
      'P1-37'
    ],
    peripherals: [
      'gpio'
    ]
  },
  26: {
    pins: [
      'GPIO12',
      'PWM0',
      'P1-32'
    ],
    peripherals: [
      'gpio',
      'pwm'
    ]
  },
  27: {
    pins: [
      'GPIO16',
      'P1-36'
    ],
    peripherals: [
      'gpio'
    ]
  },
  28: {
    pins: [
      'GPIO20',
      'MOSI1',
      'P1-38'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  },
  29: {
    pins: [
      'GPIO21',
      'SCLK1',
      'P1-40'
    ],
    peripherals: [
      'gpio',
      'spi'
    ]
  }
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
  for (var i = 0; i < pins[pin].pins.length; i++) {
    aliases[pins[pin].pins[i]] = parseInt(pin);
  }
}

export function getPins() {
  return pins;
}

export function getPinNumber(alias) {
  alias = alias.toString();
  if (Object.keys(pins).indexOf(alias.toString()) != -1) {
    return parseInt(alias);
  } else {
    return aliases[alias];
  }
}
