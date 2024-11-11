/**
 * Returns the width of the window
 * @param {number} windowWidth - The width of the window.
 * @returns {number} The width of the window.
 */

import { useWindowDimensions } from 'react-native';

export const useWindowWidth = () => {
  const windowWidth = useWindowDimensions().width;
  return windowWidth;
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
