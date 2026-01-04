/**
 * Returns the width of the window
 * @param {number} windowWidth - The width of the window.
 * @returns {number} The width of the window.
 */

import { useWindowDimensions } from 'react-native';

export const useWindowWidth = () => {
  return useWindowDimensions().width;
};

/**
 * Breakpoints for responsive design
 * @returns {object} The breakpoints for responsive design
 */

export const breakpoints = {
  small: 480,
  medium: 768,
  large: 1024,
  xlarge: 1280,
};

/**
 * Hook that returns semantic boolean values for responsive breakpoints
 * @returns {object} Object containing boolean flags for different screen sizes
 */
export const useBreakpoints = () => {
  const windowWidth = useWindowWidth();

  return {
    isSmallScreen: windowWidth < breakpoints.small, // width < 480
    isMediumScreen: windowWidth >= breakpoints.small && windowWidth < breakpoints.medium, // width >= 480 && width < 768
    isLargeScreen: windowWidth >= breakpoints.medium && windowWidth < breakpoints.large, // width >= 768 && width < 1024
    isXLargeScreen: windowWidth >= breakpoints.large, // width >= 1024
    isSmallOrMedium: windowWidth < breakpoints.medium, // width < 768
    isMediumOrLarger: windowWidth >= breakpoints.medium, // width >= 768
    isLargeOrLarger: windowWidth >= breakpoints.large, // width >= 1024
  };
};

