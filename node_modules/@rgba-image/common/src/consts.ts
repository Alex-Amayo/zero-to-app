import { CompositeMode } from './types'

export const COMPOSITE_NONE: CompositeMode = -1
export const COMPOSITE_NORMAL: CompositeMode = 0
export const COMPOSITE_MULTIPLY: CompositeMode = 1
export const COMPOSITE_SCREEN: CompositeMode = 2
export const COMPOSITE_OVERLAY: CompositeMode = 3
export const COMPOSITE_DARKEN: CompositeMode = 4
export const COMPOSITE_LIGHTEN: CompositeMode = 5
export const COMPOSITE_HARD_LIGHT: CompositeMode = 6
export const COMPOSITE_DIFFERENCE: CompositeMode = 7
export const COMPOSITE_EXCLUSION: CompositeMode = 8

export const compositeModeNames = [
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'hard light',
  'difference', 'exclusion'
]

export const compositeModeNameToMode: { [ name: string]: CompositeMode } = {
  normal: COMPOSITE_NORMAL,
  multiply: COMPOSITE_MULTIPLY,
  screen: COMPOSITE_SCREEN,
  overlay: COMPOSITE_OVERLAY,
  darken: COMPOSITE_DARKEN,
  lighten: COMPOSITE_LIGHTEN,
  'hard light': COMPOSITE_HARD_LIGHT,
  difference: COMPOSITE_DIFFERENCE,
  exclusion: COMPOSITE_EXCLUSION
}
