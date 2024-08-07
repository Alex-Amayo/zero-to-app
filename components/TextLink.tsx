import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import brand from '../brand/brandConfig';

type TextLinkprops = {
  text: string;
  onPress?: () => void;
  href?: string;
};
const TextLink = ({ text, onPress, href }: TextLinkprops) => {
  const handlePress = () => {
    if (href) {
      Linking.openURL(href);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
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
