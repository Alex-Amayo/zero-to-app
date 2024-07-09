import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import brand from "../brand/brandConfig";

type ButtonProps = {
  title: string;
  secondary?: boolean;
  onPress?: () => void;
};

const Button = ({ title, secondary, onPress }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress ? onPress : () => console.log("Button pressed")}
      style={secondary ? styles.secondary : styles.primary}
    >
      <View>
        <Text 
          style={{
            ...styles.text,
          }}>
            {title}
          </Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  primary: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: brand.borderRadius,
    backgroundColor: brand.colors.primary,
  },
  secondary: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: brand.borderRadius,
    backgroundColor: brand.colors.secondary,
  },
  text: {
    fontSize: brand.fontSizes.medium,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF"
  },
});
