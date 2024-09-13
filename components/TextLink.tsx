import React from 'react';
import { Text, StyleSheet, Pressable, Linking } from 'react-native';
import brand from '../brand/brandConfig';
import { StyledText } from './StyledText';

type TextLinkProps = {
  text: string;
  onPress?: () => void;
  href?: string;
};

/**
 * Returns a pressable text component
 *
 * @param {string} text - Text to be displayed
 * @param {()=>void} [onPress] - Optional function to be executed when pressed.
 * @param {string} [href] - optional url to navigate to when pressed.
 *
 * @returns {JSX.Element} - Returns rendered text link component.
 */
const TextLink = ({ text, onPress, href }: TextLinkProps) => {
  const handlePress = () => {
    if (href) {
      Linking.openURL(href);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <StyledText color="#1877f2">{text}</StyledText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default TextLink;
