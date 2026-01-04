import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { BlurView } from 'expo-blur';
import { ThemeContext } from '../../theme';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onPress: () => void;
  hidden?: boolean;
}

const ArrowButton = ({ direction, onPress, hidden = false }: ArrowButtonProps) => {
  const theme = React.useContext(ThemeContext);
  const iconName = direction === 'left' ? 'chevron-left' : 'chevron-right';
  
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <BlurView intensity={100} tint="light" style={styles.blurContainer}>
        <Feather name={iconName} size={20} color={theme.values.highlightColor} />
      </BlurView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderWidth: 0,
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ArrowButton };

