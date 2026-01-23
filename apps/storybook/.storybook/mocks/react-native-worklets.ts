// Mock for react-native-worklets in web environments
// This prevents worklet errors when running Storybook on web

export const useSharedValue = (value: any) => ({ value });
export const useAnimatedStyle = (updater: () => any) => ({});
export const runOnJS = (fn: Function) => fn;
export const runOnUI = (fn: Function) => fn;

export default {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  runOnUI,
};
