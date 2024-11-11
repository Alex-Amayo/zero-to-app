import * as assert from 'assert'
import { createImage, CreateImageFactory } from '..'

describe( 'create-image', () => {
  describe( 'createImage', () => {
    it( 'accepts valid width and height', () => {
      assert.doesNotThrow( () => createImage( 5, 5 ) )
    } )

    it( 'transparent rectangle if no data', () => {
      const { width, height, data } = createImage( 5, 5 )

      for ( let y = 0; y < height; y++ ) {
        for ( let x = 0; x < width; x++ ) {
          const i = y * width + x
          const j = i * 4
          const r = data[ j ]
          const g = data[ j + 1 ]
          const b = data[ j + 2 ]
          const a = data[ j + 3 ]

          assert.strictEqual( r, 0 )
          assert.strictEqual( g, 0 )
          assert.strictEqual( b, 0 )
          assert.strictEqual( a, 0 )
        }
      }
    } )

    it( 'accepts valid width, height and data', () => {
      const data = new Uint8ClampedArray( 5 * 5 * 4 )
      assert.doesNotThrow( () => createImage( 5, 5, data ) )
    } )

    it( 'not enough arguments', () => {
      assert.throws( () => ( <any>createImage )() )
      assert.throws( () => ( <any>createImage )( 5 ) )
    } )

    it( 'bad arguments', () => {
      assert.throws( () => ( <any>createImage )( 'foo', 'bar' ) )
      assert.throws( () => ( <any>createImage )( 5, 0 ) )
      assert.throws( () => ( <any>createImage )( 5, -1 ) )
      assert.throws( () => ( <any>createImage )( 0, 5 ) )
      assert.throws( () => ( <any>createImage )( -1, 5 ) )
      assert.throws( () => ( <any>createImage )( 2, 2, [] ) )
      assert.throws( () => ( <any>createImage )( 5, 5, new Uint8ClampedArray( 25 ) ) )
      assert.throws( () => ( <any>createImage )( 5, 5, new Uint8ClampedArray( 101 ) ) )
    } )
  })

  describe( 'CreateImageFactory', () => {
    const fillR = 51
    const fillG = 153
    const fillB = 255
    const fillA = 127
    const fill = [ fillR, fillG, fillB, fillA ]

    it( 'uses fill', () => {
      const createImageWithFill = CreateImageFactory( fill )

      const { width, height, data } = createImageWithFill( 5, 5 )

      for ( let y = 0; y < height; y++ ) {
        for ( let x = 0; x < width; x++ ) {
          const i = ( y * width + x ) * 4
          const r = data[ i ]
          const g = data[ i + 1 ]
          const b = data[ i + 2 ]
          const a = data[ i + 3 ]

          assert.strictEqual( r, fillR )
          assert.strictEqual( g, fillG )
          assert.strictEqual( b, fillB )
          assert.strictEqual( a, fillA )
        }
      }
    })

    it( 'fill is iterable', () => {
      const ints = new Int8Array([ fillR, fillG, fillB, fillA ])
      assert.doesNotThrow( () => CreateImageFactory( <any>ints ) )
    })

    it( 'channels must be a positive non-zero number', () => {
      assert.throws( () => CreateImageFactory( fill, <any>'' ) )
      assert.throws( () => CreateImageFactory( fill, 0 ) )
    })

    it( 'fill must be iterable with n channels', () => {
      assert.throws( () => CreateImageFactory( [] ) )
      assert.throws( () => CreateImageFactory( <any>null ) )
      assert.throws( () => CreateImageFactory( <any>'1234' ) )
    })
  })
})
