import React from 'react';
import { Text, StyleSheet, Pressable, Linking } from 'react-native';
import brand from '../brand/brandConfig';
import { StyledText } from './StyledText';

type TextLinkProps = {
  text: string;
  onPress?: () => void;
  href?: string;
  left?: boolean;
};

/**
 * Returns a pressable text component
 *
 * @param {string} text - Text to be displayed
 * @param {boolean} [left ] - Optional prop to align the text to the left, defaults to center
 * @param {()=>void} [onPress] - Optional function to be executed when pressed.
 * @param {string} [href] - optional url to navigate to when pressed.
 *
 * @returns {JSX.Element} - Returns rendered text link component.
 */
const TextLink = ({ text, onPress, href, left }: TextLinkProps) => {
  const handlePress = () => {
    if (href) {
      Linking.openURL(href);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable onPress={handlePress}>
      {/** Alignment default to centered, if left is passed centered is false and left is true */}
      <StyledText center={left ? false : true } left={left ? true : false } color="#1877f2">{text}</StyledText>
    </Pressable>
  );
};

export default TextLink;
