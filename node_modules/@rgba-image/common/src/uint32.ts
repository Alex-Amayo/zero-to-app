import { Rgba } from './types'

export const rgbaToUint32 = ( r: number, g: number, b: number, a: number, isLittleEndian = false ) =>
  isLittleEndian ?
    ( a << 24 ) | ( b << 16 ) | ( g << 8 ) | r :
    ( r << 24 ) | ( g << 16 ) | ( b << 8 ) | a

export const uint32ToRgba = ( v: number, isLittleEndian = false ): Rgba =>
  isLittleEndian ?
    [ v & 255, ( v >> 8 ) & 255, ( v >> 16 ) & 255, ( v >> 24 ) & 255 ]:
    [ ( v >> 24 ) & 255, ( v >> 16 ) & 255, ( v >> 8 ) & 255, v & 255 ]
