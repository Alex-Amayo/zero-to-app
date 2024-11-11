# lanczos

Resize an ImageData using lanczos resampling

## install

`npm install @rgba-image/lanczos`

## usage

Resize the source image to fit in the destination image:

```js
const { lanczos } = require( '@rgba-image/lanczos' )

lanczos( source, dest )
```

Resize from a source region to a location on the destination image:

```js
const sourceX = 10
const sourceY = 20
const sourceWidth = 50
const sourceHeight = 100
const destX = 30
const destY = 40
const destWidth = 150
const destHeight = 300

lanczos( source, dest, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight )
```

Arguments following `dest` are optional

If omitted, `sourceX` is `0`, `sourceY` is `0`, `sourceWidth` is
`source.width - sourceX`, `sourceHeight` is `source.height - sourceY`, `destX`
is `0`, `destY` is `0`, `destWidth` is `dest.width - destX` and `destHeight` is
`dest.height - destY`

## lanczos2

By default it uses lanczos3 resampling. You can also use lanczos2, usage is
exactly the same, but you import lanczos2 instead of lanczos:

```js
const { lanczos2 } = require( '@rgba-image/lanczos' )
```

## License

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