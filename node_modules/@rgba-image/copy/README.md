# copy

Copy pixels from one image to another

The pixels copied from the source image replace the pixels in the destination
image

## install

`npm install @rgba-image/copy`

## usage

Copy all of source to destination:

```js
const { copy } = require( '@rgba-image/copy' )

copy( source, dest )
```

Copy from a source region to a location on the destination image:

```js
const sourceX = 10
const sourceY = 20
const sourceWidth = 50
const sourceHeight = 100
const destX = 30
const destY = 40

copy( source, dest, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY )
```

Arguments following `dest` are optional

If omitted, `sourceX` is `0`, `sourceY` is `0`, `sourceWidth` is
`source.width - sourceX`, `sourceHeight` is `source.height - sourceY`, `destX`
is `0` and `destY` is `0`

Arguments are checked such that that no out of bound pixels are read or written

## License

MIT License

Copyright (c) 2021 Nik Coughlin

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