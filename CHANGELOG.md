## 1.3.0 (2015-2-12)

- Added getBoardRevision method

## 1.2.2 (2014-12-30)

- Added support for looking up Wiring Pi pin numbers that are passed in as a string

## 1.2.1 (2014-12-29)

- README updates

## 1.2.0 (2014-12-20)

- Added P5 support for R2 models
- Added some missed peripherals
- POTENTIALLY BREAKING: Modified all peripherals to have a number, so "SDA"->"SDA0", etc
    - This change was done to allow for multiple SPI connections
    - It's possible there will be multiple I2C and UART pins on future revisions (the BCM2835 supports them)

## 1.1.2 (2014-12-2)

- Well this is embarrassing, I had a bug in package.json

## 1.1.1 (2014-12-1)

- Bug fix with looking up a pin number by said pin number

## 1.1.0 (2014-12-1)

- Switched to using ECMAScript 6
- Added peripheral usage and removed # => P1-# mappings
    - This is a breaking API change!

## 1.0.2 (2014-11-27)

- Reworked aliases so that they map to Wiring Pi numbers, not header numbers
- Added support for "P1-#" style identifiers so that eventually P5 can be supported too 

## 1.0.0-1.0.1 (2014-11-26)

- Implemented initial functionality
