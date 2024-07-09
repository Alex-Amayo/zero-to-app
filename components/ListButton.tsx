import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import brand from '../brand/brandConfig';
import { ThemeContext } from '../theme/theme';

type ListButtonProps = {
  text: string;
  icon: keyof typeof Feather.glyphMap;
  onPress?: () => void;
};

const ListButton = ({ onPress, text, icon }: ListButtonProps) => {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={styles.listButton}
      onPress={onPress ? onPress : () => console.log('List Button pressed')}>
      <Text
        style={{
          ...styles.text,
          //Text color is set with theme color
          color: theme.values.color,
        }}>
        {text}
      </Text>
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
  text: {
    fontSize: brand.fontSizes.medium,
    fontWeight: '500',
  },
});
