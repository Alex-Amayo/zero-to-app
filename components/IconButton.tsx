import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { ThemeContext } from '../theme/theme';
import brand from '../brand/brandConfig';

type IconButtonProps = {
  iconName: keyof typeof Feather.glyphMap;
  onPress: (event: GestureResponderEvent) => void;
  raised?: boolean;
};

/**
 * Renders rounded icon button with icon from expo-vector icons.
 *
 * @param { keyof typeof Feather.glyphMap } iconName - Icon name from https://icons.expo.fyi/Index
 * @param {boolean} [raised] - conditional option to enable shadows if shadows are set to true in brandConfig
 * @param {(event: GestureResponderEvent) => void} onPress - Function executed when icon button is pressed.
 *
 * @returns { JSX.Element } - Returns rendered IconButton with specified icon inside.
 */
const IconButton = ({ iconName, onPress, raised }: IconButtonProps): JSX.Element => {
  //Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: theme.values.iconButtonBackgroundColor,
        shadowOpacity: raised && brand.shadows ? 0.4 : undefined,
        shadowRadius: raised && brand.shadows ? 5 : undefined,
        elevation: raised && brand.shadows ? 20 : undefined,
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
