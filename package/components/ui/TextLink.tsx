import React, { useState, useContext } from 'react';
import { Linking, Pressable, Platform } from 'react-native';
import { StyledText } from './StyledText';
import { ThemeContext } from '../../theme';

type TextLinkProps = {
  text: string;
  onPress?: () => void;
  href?: string;
  align?: 'left' | 'center' | 'right';
  color?: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | number;
};

/**
 * A pressable text component that can navigate to a URL or trigger an action.
 */
const TextLink = ({ text, onPress, href, align = 'center', color, fontSize = 'sm' }: TextLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useContext(ThemeContext);

  const handlePress = () => {
    if (href) {
      Linking.openURL(href);
    } else if (onPress) {
      onPress();
    }
  };

  // On web, use primary color (highlightColor) when hovered, otherwise use provided color
  const textColor = Platform.OS === 'web' && isHovered ? theme.values.highlightColor : color;

  return (
    <Pressable
      onPress={handlePress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}>
      <StyledText
        align={align}
        color={textColor}
        fontSize={fontSize}>
        {text}
      </StyledText>
    </Pressable>
  );
};

export { TextLink };
