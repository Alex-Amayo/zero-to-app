import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { ThemeContext } from '../theme/theme';

type IconButtonProps = {
  iconName: keyof typeof Feather.glyphMap;
  alternateIconName: keyof typeof Feather.glyphMap;
  onPress?: () => void;
};

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
        size={25}
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