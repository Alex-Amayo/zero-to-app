export type CreateImage = (
  width: number, height: number, data?: Uint8ClampedArray
) => ImageData

export type SourceToDest = (
  source: ImageData,
  dest: ImageData,
  sx?: number, sy?: number,
  sw?: number, sh?: number,
  dx?: number, dy?: number,
  dw?: number, dh?: number
) => void

export type Mutate = (
  dest: ImageData,
  dx?: number, dy?: number,
  dw?: number, dh?: number
) => void

export type MutateColor = (
  dest: ImageData,
  color: Iterable<number>,
  dx?: number, dy?: number,
  dw?: number, dh?: number
) => void

export interface GrayData extends ImageData {}

export type PlotData = [ number, number, number, number, number, number ]

export type PlotUint32Data = [ number, number, number ]

export type Rgba = [ number, number, number, number ]

export type CompositeMode = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type CompositeRgba = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => Rgba

export type CompositeRgbaUint32 = (
  sR: number, sG: number, sB: number, sA: number,
  dR: number, dG: number, dB: number, dA: number
) => number

export type CompositeChannel = ( source: number, dest: number ) => number

export type CompositeArg = CompositeMode | CompositeRgbaUint32

export type MapRgba = ( r: number, g: number, b: number, a: number ) => Rgba

export type MapRgbaUint32 = (
  r: number, g: number, b: number, a: number
) => number

export type MapChannel = ( source: number ) => number

export type AdjustRgba = (
  r: number, g: number, b: number, a: number, amount: number
) => Rgba

export type AdjustRgbaUint32 = (
  r: number, g: number, b: number, a: number, amount: number
) => number

export type AdjustChannel = ( source: number, amount: number ) => number

export type RgbaStop = [ number, number, number, number, number ]

export type RgbaUint32Stop = [ number, number ]

export type ChannelStop = [ number, number ]
