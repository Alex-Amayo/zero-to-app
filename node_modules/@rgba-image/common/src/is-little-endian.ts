const getLittleEndian = () => {
  const array = new Uint8Array( 4 )
  const view = new Uint32Array( array.buffer )

  return !!( ( view[ 0 ] = 1 ) & array[ 0 ] )
}

export const isLittleEndian = getLittleEndian()
