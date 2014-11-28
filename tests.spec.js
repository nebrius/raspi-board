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

/*global describe, it, expect */

global._raspiTest = true;
var board = require('./index.js');

describe('Board Tests', function() {
  it('can get the pins', function() {
    var pins = board.getPins();
    expect(pins[8].length).toBe(4);
    expect(pins[8].indexOf('GPIO2')).not.toBe(-1);
    expect(pins[8].indexOf('SDA')).not.toBe(-1);
    expect(pins[8].indexOf('P1-3')).not.toBe(-1);
    expect(pins[8].indexOf('3')).not.toBe(-1);
  });
  it('can lookup pin numbers', function() {
    expect(board.getPinNumber('GPIO2')).toBe(8);
    expect(board.getPinNumber('TXD')).toBe(15);
    expect(board.getPinNumber(12)).toBe(1);
  })
});