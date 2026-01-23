// Mock for react-native-reanimated in web environments
// This prevents worklet errors when running Storybook on web

export type SharedValue<T = any> = { value: T };

export const useSharedValue = <T = any>(value: T): SharedValue<T> => ({ value });
export const useAnimatedStyle = (updater: () => any) => ({});
export const useAnimatedRef = <T = any>() => ({ current: null as T | null });
export const useAnimatedScrollHandler = (handlers: any, deps?: any[]) => () => {};
export const useScrollViewOffset = (ref: any) => useSharedValue(0);
export const withTiming = (value: any, config?: any) => value;
export const withSpring = (value: any, config?: any) => value;
export const withRepeat = (value: any, iterations?: number, reverse?: boolean) => value;
export const withSequence = (...values: any[]) => values[0];
export const withDelay = (delay: number, value: any) => value;
export const cancelAnimation = () => {};
export const runOnJS = (fn: Function) => fn;
export const runOnUI = (fn: Function) => fn;
export const interpolate = (
  value: number,
  inputRange: number[],
  outputRange: number[],
  options?: any
) => {
  // Simple linear interpolation for web mock
  const minInput = Math.min(...inputRange);
  const maxInput = Math.max(...inputRange);
  const minOutput = Math.min(...outputRange);
  const maxOutput = Math.max(...outputRange);
  const normalized = (value - minInput) / (maxInput - minInput);
  return minOutput + normalized * (maxOutput - minOutput);
};

export const Extrapolation = {
  IDENTITY: 'identity',
  CLAMP: 'clamp',
  EXTEND: 'extend',
};

export const Easing = {
  linear: (t: number) => t,
  ease: (t: number) => t,
  quad: (t: number) => t * t,
  cubic: (t: number) => t * t * t,
  poly: (n: number) => (t: number) => Math.pow(t, n),
  sin: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  circle: (t: number) => 1 - Math.sqrt(1 - t * t),
  exp: (t: number) => Math.pow(2, 10 * (t - 1)),
  elastic: (bounciness: number = 1) => (t: number) => t,
  back: (s: number = 1.70158) => (t: number) => t,
  bounce: (t: number) => t,
  bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => t,
  in: (easing: (t: number) => number) => easing,
  out: (easing: (t: number) => number) => easing,
  inOut: (easing: (t: number) => number) => easing,
};

export const Animated = {
  View: require('react-native').View,
  Text: require('react-native').Text,
  Image: require('react-native').Image,
  ScrollView: require('react-native').ScrollView,
  FlatList: require('react-native').FlatList,
  SectionList: require('react-native').SectionList,
};

export const createAnimatedComponent = (component: any) => component;

export default {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useScrollViewOffset,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  cancelAnimation,
  runOnJS,
  runOnUI,
  interpolate,
  Extrapolation,
  Easing,
  Animated,
  createAnimatedComponent,
};
