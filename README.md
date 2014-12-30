Raspi Board
===========

Raspi Board provides pin mapping functionality for the various Raspberry Pi models. This module is meant to be run on a physical Raspberry Pi _only_, and maps pins for the specific board it is being run on.

## Installation

```Shell
npm install raspi-board
```

## API

### getPins()

Gets a list of 

_Arguments_: None.

_Return Type_: An array of pin entry objects structured such that the array index is the Wiring Pi pin number, each with the following structure:

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>pins</td>
    <td>Array</td>
    <td>An array of all the pin names for pin, e.g. ```['GPIO21', 'SCLK1', 'P1-40']```</td>
  </tr>
  <tr>
    <td>peripherals</td>
    <td>Array</td>
    <td>An array of all the peripherals supported on the pin, and may contain any combination of ```'gpio'```, ```'pwm'```, ```'i2c'```, ```'uart'```, or ```'spi'```</td>
  </tr>
</table>

### getPinNumber(pin)

Normalizes a pin name to a Wiring Pi pin number. This method accounts for the differences between board revisions by checking which Raspberry Pi the method is being called on.

_Arguments_:

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>pin</td>
    <td>String | Number</td>
    <td>The pin name/number to normalize. If a number is passed in, it is assumed to be the Wiring Pi pin number</td>
  </tr>
</table>

_Return Type_: A number representing the Wiring Pi pin number 

## Examples

```JavaScript

var board = require('raspi-board');

// Prints 14
console.log(board.getPinNumber('SCLK0'));
```

License
=======

The MIT License (MIT)

Copyright (c) 2014 Bryan Hughes bryan@theoreticalideations.com (https://theoreticalideations.com)

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
