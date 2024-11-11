export const getIndex = ( x: number, y: number, width: number, channels = 4 ) => {
  x = x|0
  y = y|0
  width = width|0
  channels = channels|0

  return ( y * width + x ) * channels
}
