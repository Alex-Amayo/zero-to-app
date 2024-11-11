import { SourceToDest } from '@rgba-image/common'
import { copy } from '@rgba-image/copy'
import { createImage } from '@rgba-image/create-image'
import { filters } from './filters'
import { convolve } from './convolve'

const resize = ( source: ImageData, dest: ImageData, use2 = false ) => {
  const xRatio = dest.width / source.width
  const yRatio = dest.height / source.height

  const filtersX = filters( source.width, dest.width, xRatio, 0, use2 )
  const filtersY = filters( source.height, dest.height, yRatio, 0, use2 )

  const tmp = new Uint8ClampedArray( dest.width * source.height * 4 )

  convolve( source.data, tmp, source.width, source.height, dest.width, filtersX )
  convolve( tmp, dest.data, source.height, dest.width, dest.height, filtersY )
}

export const lanczos: SourceToDest = ( source: ImageData, dest: ImageData, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0, dw = dest.width - dx, dh = dest.height - dy ) => {
  sx = sx | 0
  sy = sy | 0
  sw = sw | 0
  sh = sh | 0
  dx = dx | 0
  dy = dy | 0
  dw = dw | 0
  dh = dh | 0

  if ( sw <= 0 || sh <= 0 || dw <= 0 || dh <= 0 ) return

  if( sx === 0 && sy === 0 && sw === source.width && sh === source.height && dx === 0 && dy === 0 && dw === dest.width && dh === dest.height ){
    resize( source, dest )

    return
  }

  /*
    this is more expensive than the way we do in other rgba-lib functions, but
    I don't understand the pica code that I based this on well enough to work
    out how to use regions without doing crops first

    however copy is pretty fast compared to lanczos, so the difference is slight
  */
  const croppedSource = createImage( sw, sh )
  const croppedDest = createImage( dw, dh )
  copy( source, croppedSource, sx, sy )
  resize( croppedSource, croppedDest )
  copy( croppedDest, dest, 0, 0, croppedDest.width, croppedDest.height, dx, dy )
}

export const lanczos2: SourceToDest = ( source: ImageData, dest: ImageData, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0, dw = dest.width - dx, dh = dest.height - dy ) => {
  sx = sx | 0
  sy = sy | 0
  sw = sw | 0
  sh = sh | 0
  dx = dx | 0
  dy = dy | 0
  dw = dw | 0
  dh = dh | 0

  if ( sw <= 0 || sh <= 0 || dw <= 0 || dh <= 0 ) return

  if ( sx === 0 && sy === 0 && sw === source.width && sh === source.height && dx === 0 && dy === 0 && dw === dest.width && dh === dest.height ) {
    resize( source, dest, true )

    return
  }

  /*
    this is more expensive than the way we do in other rgba-lib functions, but
    I don't understand the pica code that I based this on well enough to work
    out how to use regions without doing crops first

    however copy is pretty fast compared to lanczos, so the difference is slight
  */
  const croppedSource = createImage( sw, sh )
  const croppedDest = createImage( dw, dh )
  copy( source, croppedSource, sx, sy )
  resize( croppedSource, croppedDest, true )
  copy( croppedDest, dest, 0, 0, croppedDest.width, croppedDest.height, dx, dy )
}
