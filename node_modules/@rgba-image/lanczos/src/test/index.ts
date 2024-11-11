import * as assert from 'assert'
import * as fs from 'fs'
import { fromPng, toPng } from '@rgba-image/png'
import { createImage } from '@rgba-image/create-image'
import { lanczos, lanczos2 } from '..'

const patternPng = fs.readFileSync( './src/test/fixtures/pattern.png' )
const patternBorderPng = fs.readFileSync( './src/test/fixtures/pattern-border.png' )
const expectPatternHalfPng = fs.readFileSync( './src/test/fixtures/pattern-half.png' )
const expectPatternHalf2Png = fs.readFileSync( './src/test/fixtures/pattern-half-2.png' )
const expectPatternDoublePng = fs.readFileSync( './src/test/fixtures/pattern-double.png' )
const expectPatternHalfRegionPng = fs.readFileSync( './src/test/fixtures/pattern-half-region.png' )
const expectPatternHalfRegion2Png = fs.readFileSync( './src/test/fixtures/pattern-half-region-2.png' )
const expectPatternDoubleRegionPng = fs.readFileSync( './src/test/fixtures/pattern-double-region.png' )
const expectPatternOutOfBoundsPng = fs.readFileSync( './src/test/fixtures/pattern-out-of-bounds.png' )

const pattern = fromPng( patternPng )
const patternBorder = fromPng( patternBorderPng )
const expectPatternHalf = fromPng( expectPatternHalfPng )
const expectPatternHalf2 = fromPng( expectPatternHalf2Png )
const expectPatternDouble = fromPng( expectPatternDoublePng )
const expectPatternHalfRegion = fromPng( expectPatternHalfRegionPng )
const expectPatternHalfRegion2 = fromPng( expectPatternHalfRegion2Png )
const expectPatternDoubleRegion = fromPng( expectPatternDoubleRegionPng )
const expectPatternOutOfBounds = fromPng( expectPatternOutOfBoundsPng )

const getNoise = () => {
  const width = 2048
  const height = 2048
  const noise = createImage( width, height )

  for ( let y = 0; y < height; y++ ) {
    for ( let x = 0; x < width; x++ ) {
      const index = ( y * width + x ) * 4
      noise.data[ index ] = ( Math.random() * 256 ) | 0
      noise.data[ index + 1 ] = ( Math.random() * 256 ) | 0
      noise.data[ index + 2 ] = ( Math.random() * 256 ) | 0
      noise.data[ index + 3 ] = ( Math.random() * 256 ) | 0
    }
  }

  return noise
}

const noise = getNoise()

describe( 'lanczos', () => {
  it( 'resizes down', () => {
    const patternHalf = createImage( 4, 4 )

    lanczos( pattern, patternHalf )

    assert.deepEqual( patternHalf, expectPatternHalf )
  } )

  it( 'resizes down with lanczos2', () => {
    const patternHalf = createImage( 4, 4 )

    lanczos2( pattern, patternHalf )

    assert.deepEqual( patternHalf, expectPatternHalf2 )
  } )

  it( 'resizes up', () => {
    const patternDouble = createImage( 16, 16 )

    lanczos( pattern, patternDouble )

    assert.deepEqual( patternDouble, expectPatternDouble )
  } )

  it( 'resizes region down', () => {
    const patternHalfRegion = createImage( 6, 6 )

    lanczos( patternBorder, patternHalfRegion, 2, 2, 8, 8, 1, 1, 4, 4 )

    assert.deepEqual( patternHalfRegion, expectPatternHalfRegion )
  } )

  it( 'resizes region down with lanczos2', () => {
    const patternHalfRegion = createImage( 6, 6 )

    lanczos2( patternBorder, patternHalfRegion, 2, 2, 8, 8, 1, 1, 4, 4 )

    assert.deepEqual( patternHalfRegion, expectPatternHalfRegion2 )
  } )

  it( 'resizes region up', () => {
    const patternDoubleRegion = createImage( 18, 18 )

    lanczos( patternBorder, patternDoubleRegion, 2, 2, 8, 8, 1, 1, 16, 16 )

    assert.deepEqual( patternDoubleRegion, expectPatternDoubleRegion )
  } )

  it( 'early return when any dimension is 0', () => {
    const empty = createImage( 8, 8 )
    const destSw = createImage( 8, 8 )
    const destSh = createImage( 8, 8 )
    const destDw = createImage( 8, 8 )
    const destDh = createImage( 8, 8 )

    lanczos( destSw, pattern, 0, 0, 0, 8 )
    lanczos( destSh, pattern, 0, 0, 8, 0 )
    lanczos( destDw, pattern, 0, 0, 8, 8, 0, 0, 0, 8 )
    lanczos( destDh, pattern, 0, 0, 8, 8, 0, 0, 8, 0 )

    assert.deepEqual( destSw, empty )
    assert.deepEqual( destSh, empty )
    assert.deepEqual( destDw, empty )
    assert.deepEqual( destDh, empty )

    lanczos2( destSw, pattern, 0, 0, 0, 8 )
    lanczos2( destSh, pattern, 0, 0, 8, 0 )
    lanczos2( destDw, pattern, 0, 0, 8, 8, 0, 0, 0, 8 )
    lanczos2( destDh, pattern, 0, 0, 8, 8, 0, 0, 8, 0 )

    assert.deepEqual( destSw, empty )
    assert.deepEqual( destSh, empty )
    assert.deepEqual( destDw, empty )
    assert.deepEqual( destDh, empty )
  } )

  it( 'does not sample outside bounds', () => {
    const patternOutOfBounds = createImage( 8, 8 )

    lanczos( pattern, patternOutOfBounds, 0, 0, 16, 16, 0, 0, 32, 32 )

    assert.deepEqual( patternOutOfBounds, expectPatternOutOfBounds )
  } )

  // no test, just lazy benchmarking
  it( 'big resize down', () => {
    const dest = createImage( 1024, 1024 )

    lanczos( noise, dest, 0, 0, 2560, 2560, 0, 0, 1280, 1280 )
  } )

  // no test, just lazy benchmarking
  it( 'big resize up', done => {
    const dest = createImage( 3072, 3072 )

    lanczos( noise, dest, 0, 0, 2560, 2560, 0, 0, 3840, 3840 )

    done()
  } ).timeout( 5000 )
} )