import { useWindowDimensions } from "react-native";

export const useWindowHeight = () => {
  const windowHeight = useWindowDimensions().height;
  return windowHeight;
};