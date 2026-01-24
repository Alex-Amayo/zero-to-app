import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { StyledText } from './StyledText';
import { ThemeContext } from '../../theme';

interface BlurButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  style?: any;
  scaleValue?: Animated.Value;
  onPressIn?: () => void;
  onPressOut?: () => void;
  activeOpacity?: number;
}

const BlurButton: React.FC<BlurButtonProps> = ({
  onPress,
  children,
  intensity = 80,
  tint = 'dark',
  style,
  scaleValue,
  onPressIn,
  onPressOut,
  activeOpacity = 0.9,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <Animated.View style={scaleValue ? { transform: [{ scale: scaleValue }] } : undefined}>
      <BlurView intensity={intensity} tint={tint} style={[styles.blurButton, { borderColor: theme.values.borderColor }, style]}>
        <TouchableOpacity 
          style={styles.touchable}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={activeOpacity}
        >
          {children}
        </TouchableOpacity>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  blurButton: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  touchable: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});

export { BlurButton };
