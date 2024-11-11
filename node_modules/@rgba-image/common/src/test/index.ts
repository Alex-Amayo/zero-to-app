import * as assert from 'assert'
import {
  getIndex, isImageData, rgbaToUint32, uint32ToRgba, isGrayData, clampByte, clampUint32, isRgbaStop, isRgbaUint32Stop, isChannelStop
} from '../'

describe( 'common', () => {
  it( 'gets index', () => {
    const index = getIndex( 3, 5, 7 )

    assert.strictEqual( index, 152 )
  } )

  it( 'isImageData', () => {
    const width = 5
    const height = 7
    const data = new Uint8ClampedArray( width * height * 4 )
    const empty = new Uint8ClampedArray()

    const pass = { width, height, data }

    assert( isImageData( pass ) )

    assert( !isImageData( null ) )
    assert( !isImageData( { width: '0', height, data } ) )
    assert( !isImageData( { width, height: '0', data } ) )
    assert( !isImageData( { width: 0, height, data } ) )
    assert( !isImageData( { width, height: 0, data } ) )
    assert( !isImageData( { width: 1.1, height, data } ) )
    assert( !isImageData( { width, height: 1.1, data } ) )
    assert( !isImageData( { width, height, data: null } ) )
    assert( !isImageData( { width, height, data: empty } ) )
  })

  it( 'isGrayData', () => {
    const width = 5
    const height = 7
    const data = new Uint8ClampedArray( width * height )
    const empty = new Uint8ClampedArray()

    const pass = { width, height, data }

    assert( isGrayData( pass ) )

    assert( !isGrayData( null ) )
    assert( !isGrayData( { width: '0', height, data } ) )
    assert( !isGrayData( { width, height: '0', data } ) )
    assert( !isGrayData( { width: 0, height, data } ) )
    assert( !isGrayData( { width, height: 0, data } ) )
    assert( !isGrayData( { width: 1.1, height, data } ) )
    assert( !isGrayData( { width, height: 1.1, data } ) )
    assert( !isGrayData( { width, height, data: null } ) )
    assert( !isGrayData( { width, height, data: empty } ) )
  } )

  it( 'isRgbaStop', () => {
    const pass = [ 255, 255, 255, 255, 0 ]

    assert( isRgbaStop( pass ) )
    assert( !isRgbaStop( null ) )
    assert( !isRgbaStop( [] ) )
    assert( !isRgbaStop( [ 255, 255, 255, 255 ] ) )
    assert( !isRgbaStop( [ 255, 255, 255, 255, null ] ) )
  })


  it( 'isRgbaUint32Stop', () => {
    const pass = [ 1111111111, 0 ]

    assert( isRgbaUint32Stop( pass ) )
    assert( !isRgbaUint32Stop( null ) )
    assert( !isRgbaUint32Stop( [] ) )
    assert( !isRgbaUint32Stop( [ 1111111111 ] ) )
    assert( !isRgbaUint32Stop( [ 1111111111, null ] ) )
  } )

  it( 'isChannelStop', () => {
    const pass = [ 255, 0 ]

    assert( isChannelStop( pass ) )
    assert( !isChannelStop( null ) )
    assert( !isChannelStop( [] ) )
    assert( !isChannelStop( [ 255 ] ) )
    assert( !isChannelStop( [ 255, null ] ) )
  })

  it( 'rgbaToUint32', () => {
    const r = 51
    const g = 153
    const b = 255
    const a = 127

    const rgba = new Uint8ClampedArray([ r, g, b, a ])
    const view = new DataView( rgba.buffer )
    const little = view.getUint32( 0, true )
    const big = view.getUint32( 0 )

    assert.strictEqual( rgbaToUint32( r, g, b, a, true ), little )
    assert.strictEqual( rgbaToUint32( r, g, b, a ), big )
  })

  it( 'rgbaToUint32', () => {
    const r = 51
    const g = 153
    const b = 255
    const a = 127
    const rgba = [ r, g, b, a ]

    const uint32Little = rgbaToUint32( r, g, b, a, true )
    const uint32Big = rgbaToUint32( r, g, b, a, false )

    const little = uint32ToRgba( uint32Little, true )
    const big = uint32ToRgba( uint32Big )

    assert.deepEqual( little, rgba )
    assert.deepEqual( big, rgba )
  } )

  it( 'clampByte', () => {
    const under = -1
    const fraction = 123.654
    const over = 256

    assert.strictEqual( clampByte( under ), 0 )
    assert.strictEqual( clampByte( fraction ), 123 )
    assert.strictEqual( clampByte( over ), 255 )
  } )

  it( 'clampUint32', () => {
    const under = -1
    const fraction = 1111111111.654
    const over = 4294967296

    assert.strictEqual( clampUint32( under ), 0 )
    assert.strictEqual( clampUint32( fraction ), 1111111111 )
    assert.strictEqual( clampUint32( over ), 4294967295 )
  } )
})
