/*
The MIT License (MIT)

Copyright (c) 2015 Bryan Hughes <bryan@nebri.us>

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

/*global global*/

global.raspiTest = true;
var board = require('../dist/index.js');

exports.testBoardRevision = function testBoardRevision(test) {
  var revision = board.getBoardRevision();
  test.strictEqual(revision, board.VERSION_2_MODEL_B, 'Expected ' + revision + ' to equal ' + board.VERSION_2_MODEL_B);
  test.done();
};

exports.testGettingPinNumbers = function testGettingPinNumbers(test) {
  var pins = board.getPins();
  test.strictEqual(pins[8].pins.length, 3, 'Expected 3 pins but found ' + pins[8].pins.length + ' pins');
  test.notStrictEqual(pins[8].pins.indexOf('GPIO2'), -1, 'Expected to find "GPIO2" as an alias for pin 8');
  test.notStrictEqual(pins[8].pins.indexOf('SDA0'), -1, 'Expected to find "SDA0" as an alias for pin 8');
  test.notStrictEqual(pins[8].pins.indexOf('P1-3'), -1, 'Expected to find "P1-3" as an alias for pin 8');
  test.strictEqual(pins[8].peripherals.length, 2, 'Expected pin 8 to have two peripherals');
  test.notStrictEqual(pins[8].peripherals.indexOf('gpio'), -1, 'Expected pin 8 to have peripheral "gpio"');
  test.notStrictEqual(pins[8].peripherals.indexOf('i2c'), -1, 'Expected pin 8 to have peripheral "i2c"');
  test.done();
};

exports.testLookingupInNumbers = function testLookingupInNumbers(test) {
  test.strictEqual(board.getPinNumber('GPIO2'), 8, 'Expected "GPIO2" to resolve to pin 8');
  test.strictEqual(board.getPinNumber('TXD0'), 15, 'Expected "GPIO2" to resolve to pin 15');
  test.strictEqual(board.getPinNumber('P1-12'), 1, 'Expected "P1-12" to resolve to pin 1');
  test.strictEqual(board.getPinNumber(10), 10, 'Expected 10 to resolve to pin 10');
  test.strictEqual(board.getPinNumber(0), 0, 'Expected 0 to resolve to pin 0');
  test.strictEqual(board.getPinNumber('10'), 10, 'Expected "10" to resolve to pin 10');
  test.strictEqual(board.getPinNumber(50), null, 'Expected 50 to resolve to null');
  test.strictEqual(board.getPinNumber('fake'), null, 'Expected "fake" to resolve to null');
  test.done();
};

exports.testLookingUpInvalidTypes = function testLookingUpInvalidTypes(test) {
  test.strictEqual(board.getPinNumber(), null, 'Expected undefined to resolve to null');
  test.strictEqual(board.getPinNumber([]), null, 'Expected an empty array to resolve to null');
  test.strictEqual(board.getPinNumber({}), null, 'Expected an empty object to resolve to null');
  test.strictEqual(board.getPinNumber(function() {}), null, 'Expected an empty function to resolve to null');
  test.strictEqual(board.getPinNumber(/foo/), null, 'Expected a regex to resolve to null');
  test.done();
};
