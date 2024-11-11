/**
 * Returns the height of the window.
 * @param {number} windowHeight - The height of the window.
 * @returns {number} The height of the window.
 */

import { useWindowDimensions } from 'react-native';

export const useWindowHeight = () => {
  const windowHeight = useWindowDimensions().height;
  return windowHeight;
};
