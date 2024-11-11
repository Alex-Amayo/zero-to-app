import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../theme/theme';
import { StyledText } from './StyledText';

type ListButtonProps = {
  text: string;
  icon: keyof typeof Feather.glyphMap;
  onPress?: () => void;
};

/**
 * List Button component that displays a list button with an icon and text
 */

const ListButton = ({ onPress, text, icon }: ListButtonProps) => {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity style={styles.listButton} onPress={onPress}>
      <StyledText bold>{text}</StyledText>
      <Feather name={icon} size={25} color={theme.values.color} />
    </TouchableOpacity>
  );
};

export default ListButton;

const styles = StyleSheet.create({
  listButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
});
