import { useWindowDimensions } from 'react-native';

export const useWindowWidth = () => {
  const windowWidth = useWindowDimensions().width;
  return windowWidth;
};

export const breakpoints = {
  small: 480,
  medium: 768,
  large: 1024,
  xlarge: 1280,
};
