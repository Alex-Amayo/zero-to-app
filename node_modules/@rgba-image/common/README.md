# common

 Common types and utils for rgba-image

## install

`npm install @rgba-image/common`

## usage

Clamp a value to byte:

```js
const { clampByte } = require( '@rgba-image/common' )

// 123
const r = clampByte( 123.456 )

// 0
const g = clampByte( -1 )

// 255
cosnt b = clampByte( 257 )
```

Clamp a value to uint32:

```js
const { clampUint32 } = require( '@rgba-image/common' )

// 4294967295
const v = clampUint32( 4294967296.456 )

// etc
```

Get an index into ImageData:

```js
const { getIndex } = require( '@rgba-image/common' )

const x = 3
const y = 5
const width = 7

const index = getIndex( x, y, width )
```

Is the current processor little endian?

```js
const { isLittleEndian } = require( '@rgba-image/common' )

if( isLittleEndian ){
  //...
}
```

Is the current object a valid ImageData?

nb - tests that the object matches the `ImageData` interface, *not* that it is
an instance of `ImageData`

```js
const { isImageData } = require( '@rgba-image/common' )

const id = new ImageData( 300, 150 )

if( isImageData( id ) ){
  //...
}
```

We also add a new interface, `GrayData` - the definition is the same as
`ImageData` but it is expected to have 1 byte per pixel rather than 4. There is
a predicate for checking that they match this:

```js
const { isGrayData } = require( '@rgba-image/common' )

const gray = {
  width: 300,
  height: 150,
  data: new Uint8ClampedArray( 300 * 150 )
}

if( isGrayData( gray ) ){
  //...
}
```

Get the Uint32 representation of an RGBA color

nb - ImageData stores RGBA in little endian format

```js
const { rgbaToUint32 } = require( '@rgba-image/common' )

const little = rgbaToUint32( 51, 153, 255, 127, true )
const big = rgbaToUint32( 51, 153, 255, 127, false )
```

## TODO

- Document gradient stop types and predicates - actually, all exported types
- Add predicates for all exported types except functions

## license


MIT License

Copyright (c) 2018 Nik Coughlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.