import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";

type IconButtonProps = {
  iconName: keyof typeof Feather.glyphMap;
  onPress?: () => void;
};

const IconButton = ({ iconName, onPress }: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => console.log("Icon Button pressed")}
      style={styles.container}
    >
      <Feather name={iconName} size={25} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#E4E6EB",
    borderRadius: 25,
  },
});
