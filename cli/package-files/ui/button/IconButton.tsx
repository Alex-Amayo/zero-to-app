import React, { useContext } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { ThemeContext } from '../../theme';

type IconButtonProps = {
  iconName: keyof typeof Feather.glyphMap;
  onPress: () => void;
  color?: string;
  backgroundColor?: string;
};

/**
 * Renders rounded icon button with icon from expo-vector icons.
 */

const IconButton = ({ iconName, onPress, color, backgroundColor }: IconButtonProps) => {
  //Initialize theme
  const theme = useContext(ThemeContext);
  
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: backgroundColor ?? 'transparent',
      }}>
      <Feather name={iconName} size={20} color={color ? theme.values.iconButtonIconColor : theme.values.color} />
    </Pressable>
  );
};

export { IconButton };

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
