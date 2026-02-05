import { useWindowDimensions } from 'react-native';

/**
 * Breakpoints for responsive design (sizing only)
 */
export const breakpoints = {
  small: 480,
  medium: 768,
  large: 1024,
  xlarge: 1280,
};

export type Breakpoint = 'small' | 'medium' | 'large' | 'xlarge';

export interface DimensionsInfo {
  width: number;
  height: number;
  breakpoint: Breakpoint;
}

/**
 * Unified hook that provides window dimensions and breakpoint information
 * Focuses on sizing decisions only - no duplicate semantic abstractions
 * Platform checks should use React Native Platform.OS directly
 * 
 * @example
 * const dimensions = useDimensions();
 * if (dimensions.width > breakpoints.medium) { ... }
 * if (dimensions.breakpoint !== 'small') { ... }
 * 
 * // For platform-specific logic:
 * import { Platform } from 'react-native';
 * if (Platform.OS === 'web' && dimensions.breakpoint === 'small') { ... }
 */
export const useDimensions = (): DimensionsInfo => {
  const { width, height } = useWindowDimensions();

  // Determine breakpoint based on width
  let breakpoint: Breakpoint = 'small';
  if (width >= breakpoints.xlarge) {
    breakpoint = 'xlarge';
  } else if (width >= breakpoints.large) {
    breakpoint = 'large';
  } else if (width >= breakpoints.medium) {
    breakpoint = 'medium';
  }

  return {
    width,
    height,
    breakpoint,
  };
};

