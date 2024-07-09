import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { ThemeContext } from "../theme/theme";


type IconButtonProps = {
  iconName: keyof typeof Feather.glyphMap;
  onPress?: () => void;
};

const IconButton = ({ iconName, onPress }: IconButtonProps) => {
  //Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => console.log("Icon Button pressed")}
      style={{
        ...styles.container,
        backgroundColor: theme.values.iconButtonBackgroundColor,
        }
      }
    >
      <Feather 
        name={iconName} 
        size={25} 
        color={
          theme.values.iconButtonIconColor
      } />
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
    borderRadius: 25,
  },
});
