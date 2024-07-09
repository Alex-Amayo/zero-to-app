import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import brand from "../brand/brandConfig";
import { ThemeContext } from "../theme/theme";

type CardProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const Card = ({ children }: CardProps) => {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return <View style={{
    // Configure background and border color with theme
    backgroundColor: theme.values.cardBackgroundColor,
    borderColor: theme.values.borderColor,
    shadowColor: brand.shadow ? theme.values.shadowColor : undefined,
    ...styles.container
  }}>
    {children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: brand.borderRadius,
    borderWidth: 1,
    shadowOffset: brand.shadow ? { width: -2, height: 2 } : undefined,
    shadowOpacity: brand.shadow ? 0.4 : undefined,
    shadowRadius: brand.shadow ? 5 : undefined,
    elevation: brand.shadow ? 20 : undefined,
  },
});
