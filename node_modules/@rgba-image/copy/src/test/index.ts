import * as assert from 'assert'
import * as fs from 'fs'
import { fromPng } from '@rgba-image/png'
import { createImage } from '@rgba-image/create-image'
import { copy } from '..'

const patternPng = fs.readFileSync( './src/test/fixtures/pattern.png' )
const patternCopyPng = fs.readFileSync( './src/test/fixtures/pattern-copy.png' )

const pattern = fromPng( patternPng )
const patternCopy = fromPng( patternCopyPng )

const getNoise = () => {
  const width = 1024
  const height = 1024
  const noise = createImage( width, height )

  for( let y = 0; y < height; y++ ){
    for( let x = 0; x < width; x++ ){
      const index = ( y * width + x ) * 4
      noise.data[ index ] = ( Math.random() * 256 ) | 0
      noise.data[ index + 1 ] = ( Math.random() * 256 ) | 0
      noise.data[ index + 2 ] = ( Math.random() * 256 ) | 0
      noise.data[ index + 3 ] = ( Math.random() * 256 ) | 0
    }
  }

  return noise
}

const allEmpty = ( array: ArrayLike<number> ) => {
  for( let i = 0; i < array.length; i++ ){
    if( array[ i ] !== 0 ) return false
  }

  return true
}

const noise = getNoise()

describe( 'copy', () => {
  it( 'copies whole image', () => {
    const dest = createImage( 8, 8 )
    copy( pattern, dest )

    assert.deepEqual( dest, pattern )
  })

  it( 'copies regions', () => {
    const sourceTopLeft = [
      0, 0, 4, 4
    ]
    const sourceTopRight = [
      4, 0, 4, 4
    ]
    const sourceBottomLeft = [
      0, 4, 4, 4
    ]
    const sourceBottomRight = [
      4, 4, 4, 4
    ]
    const destTopLeft = [
      1, 1
    ]
    const destTopRight = [
      5, 1
    ]
    const destBottomLeft = [
      1, 5
    ]
    const destBottomRight = [
      5, 5
    ]

    const dest = createImage( 10, 10 )

    copy( pattern, dest, ...sourceTopLeft, ...destBottomRight )
    copy( pattern, dest, ...sourceTopRight, ...destBottomLeft )
    copy( pattern, dest, ...sourceBottomLeft, ...destTopRight )
    copy( pattern, dest, ...sourceBottomRight, ...destTopLeft )

    assert.deepEqual( dest, patternCopy )
  })

  it( 'does not try to copy outside of source bounds', () => {
    const dest = createImage( 8, 8 )

    copy( pattern, dest, 0, 0, 10, 10 )

    assert.deepEqual( dest, pattern )
  })

  it( 'does not try to copy outside of dest bounds', () => {
    const dest = createImage( 8, 8 )

    copy( pattern, dest )
    copy( pattern, dest, 0, 0, 8, 8, 10, 10 )

    assert.deepEqual( dest, pattern )
  } )

  it( 'does an early return when sw or sh are 0', () => {
    const swDest = createImage( 8, 8 )
    const shDest = createImage( 8, 8 )

    copy( pattern, swDest, 0, 0, 0, 8 )
    copy( pattern, shDest, 0, 0, 8, 0 )

    assert( allEmpty( swDest.data ) )
    assert( allEmpty( shDest.data ) )
  })

  // no test, just lazy benchmarking
  it( 'big copy', () => {
    const dest = createImage( 768, 768 )

    copy( noise, dest, 0, 0, 1280, 1280, 0, 0 )
  })
})