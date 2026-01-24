import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { IconButton } from './IconButton';

type ToggleIconButtonProps = {
  iconName: keyof typeof Feather.glyphMap;
  alternateIconName: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  raised?: boolean;
};

/**
 * Renders a rounded icon button with an icon from Expo Vector Icons.
 * Alternates between the primary icon and an alternate icon when clicked.
 */

const ToggleIconButton = ({ iconName, alternateIconName, onPress }: ToggleIconButtonProps) => {
  const [isToggled, setIsToggled] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    setIsToggled(!isToggled);
  };

  return (
    <IconButton
      iconName={isToggled ? alternateIconName : iconName}
      onPress={handlePress}
    />
  );
};

export { ToggleIconButton };
