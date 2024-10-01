import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { ThemeContext } from '../theme/theme';
import brand from '../brand/brandConfig';

type IconButtonProps = {
  iconName: keyof typeof Feather.glyphMap;
  alternateIconName: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  raised?: boolean;
};

/**
 * Renders a rounded icon button with an icon from Expo Vector Icons.
 * Alternates between the primary icon and an alternate icon when clicked.
 * The button also toggles its background color based on the theme context.
 */

const ToggleIconButton = ({ iconName, alternateIconName, onPress, raised }: IconButtonProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const theme = useContext(ThemeContext);

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    setIsToggled(!isToggled);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        ...styles.container,
        backgroundColor: theme.values.iconButtonBackgroundColor,
        shadowOffset: raised && brand.shadows ? { width: -2, height: 2 } : undefined,
        shadowOpacity: raised && brand.shadows ? 0.2 : undefined,
        shadowRadius: raised && brand.shadows ? 5 : undefined,
        elevation: raised && brand.shadows ? 20 : undefined,
      }}>
      <Feather
        name={isToggled ? alternateIconName : iconName}
        size={20}
        color={theme.values.iconButtonIconColor}
      />
    </TouchableOpacity>
  );
};

export default ToggleIconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
