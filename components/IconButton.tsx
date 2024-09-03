import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { ThemeContext } from '../theme/theme';

type IconButtonProps = {
  iconName: keyof typeof Feather.glyphMap;
  onPress: (event: GestureResponderEvent) => void;
};

/**
 * Renders rounded icon button with icon from expo-vector icons.
 *
 * @param {Object} props - The component's props.
 * @param { keyof typeof Feather.glyphMap } props.iconName - Icon name from https://icons.expo.fyi/Index
 * @param {(event: GestureResponderEvent) => void} props.onPress - Function executed when icon button is pressed.
 *
 * @returns { JSX.Element } - Returns rendered IconButton with specified icon inside.
 */
const IconButton = ({ iconName, onPress }: IconButtonProps): JSX.Element => {
  //Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: theme.values.iconButtonBackgroundColor,
      }}>
      <Feather name={iconName} size={20} color={theme.values.iconButtonIconColor} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
