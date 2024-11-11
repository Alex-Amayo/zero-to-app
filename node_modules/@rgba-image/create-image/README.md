# create-image

Create an RGBA image compatible with the [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) Web API interface

The image will be filled with transparent black - `[ 0, 0, 0, 0 ]`

All fields are readonly:

```typescript
{
  width: number
  height: number
  data: Uint8ClampedArray
}
```

## install

`npm install @rgba-image/create-image`

## usage

```js
const { createImage } = require( '@rgba-image/create-image' )

const id = createImage( 300, 150 )
```

Populate from an existing `Uint8ClampedArray` (must be `width * height * 4` in length):

```js
const id = createImage( 300, 150, data )
```

This module also provides `CreateImageFactory`, so you can create a
`createImage` function which fills the initial data with a different color, eg
to emulate ImageData in the browser, which fills the image with opaque black:

```js
const { CreateImageFactory } = require( '@rgba-image/create-image' )

const createImage = CreateImageFactory( [ 0, 0, 0, 255 ] )

const id = createImage( 300, 150 )
```

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