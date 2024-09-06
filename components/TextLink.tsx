import React from 'react';
import { Text, StyleSheet, Pressable, Linking } from 'react-native';
import brand from '../brand/brandConfig';

type TextLinkprops = {
  text: string;
  onPress?: () => void;
  href?: string;
};

/**
 * Returns a pressable tetx component
 *
 * @param {string} props.text - Text to be displayed.
 * @param {()=>void} [props.onPress] - Optional function to be excecuted when pressed.
 * @param {string} [props.href] - optional url to navigate to when pressed.
 *
 * @returns {JSX.Element} - Returns rendered text link component.
 */
const TextLink = ({ text, onPress, href }: TextLinkprops) => {
  const handlePress = () => {
    if (href) {
      Linking.openURL(href);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    //text color for the link
    color: '#1877f2',
    fontSize: brand.fontSizes.medium,
    textAlign: 'center',
  },
});

export default TextLink;
