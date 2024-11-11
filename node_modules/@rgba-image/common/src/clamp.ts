export const clampByte = ( value: number ) =>
  value < 0 ? 0 : value > 255 ? 255 : value | 0

export const clampUint32 = ( value: number ) =>
  value < 0 ? 0 : value > 4294967295 ? 4294967295 : value >>> 0
