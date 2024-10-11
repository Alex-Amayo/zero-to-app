import React from 'react';
import { Linking, Pressable } from 'react-native';
import { StyledText } from './StyledText';

type TextLinkProps = {
  text: string;
  onPress?: () => void;
  href?: string;
  align?: 'left' | 'center' | 'right'; // Alignment prop, same as StyledText
};

/**
 * A pressable text component that can navigate to a URL or trigger an action.
 */

const TextLink = ({ text, onPress, href, align = 'center' }: TextLinkProps) => {
  const handlePress = () => {
    if (href) {
      Linking.openURL(href);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable onPress={handlePress}>
      {/** Pass the align prop directly to StyledText */}
      <StyledText align={align} color="#1877f2">
        {text}
      </StyledText>
    </Pressable>
  );
};

export default TextLink;
