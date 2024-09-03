import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { ThemeContext } from '../theme/theme';

type IconButtonProps = {
  iconName: keyof typeof Feather.glyphMap;
  alternateIconName: keyof typeof Feather.glyphMap;
  onPress?: () => void;
};

/**
 * Renders a rounded icon button with an icon from Expo Vector Icons.
 * Alternates between the primary icon and an alternate icon when clicked.
 * The button also toggles its background color based on the theme context.
 *
 * @param {Object} props - The component's props.
 * @param {keyof typeof Feather.glyphMap} props.iconName - The icon name to display initially.
 * @param {keyof typeof Feather.glyphMap} props.alternateIconName - The icon name to display when toggled.
 * @param {() => void} [props.onPress] - Optional callback function executed when the button is pressed.
 *
 * @returns {JSX.Element} The rendered icon button component.
 */

const ToggleIconButton = ({ iconName, alternateIconName, onPress }: IconButtonProps) => {
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
