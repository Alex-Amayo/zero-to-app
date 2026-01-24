import React, { useMemo } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Image } from 'expo-image';
import { StyledText, BlurButton } from '../ui';
import { useBrand } from '../../brand';
import { ThemeContext } from '../../theme';

interface FeatureCardProps {
  image: string | number;
  onPress: () => void;
  buttonText?: string;
  fallbackImage?: string | number;
}

const FeatureCard = ({
  image,
  onPress,
  buttonText = 'Ask me anything!',
  fallbackImage,
}: FeatureCardProps) => {
  const theme = React.useContext(ThemeContext);
  const brand = useBrand();
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  
  const styles = useMemo(() => StyleSheet.create({
    cardContainer: {
      flex: 1,
      borderRadius: brand.borderRadius,
    },
    card: {
      flex: 1,
      borderRadius: brand.borderRadius,
      overflow: 'hidden',
      borderWidth: 0.5,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    actionButtonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    actionButton: {
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderWidth: 0.5,
      overflow: 'hidden',
    },
  }), [brand]);

  // Handle both local assets (require) and remote URLs
  const imageSource =
    typeof image === 'string'
      ? { uri: image || (typeof fallbackImage === 'string' ? fallbackImage : undefined) }
      : image;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.card, { borderColor: theme.values.borderColor }]}>
        <Image source={imageSource} style={styles.image} contentFit="cover" />

        {/* Action Button */}
        <View style={styles.actionButtonContainer}>
          <BlurButton
            intensity={80}
            tint="dark"
            style={styles.actionButton}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            scaleValue={scaleValue}
            activeOpacity={0.9}>
            <StyledText fontSize="lg" color="white" fontWeight={500}>
              {buttonText}
            </StyledText>
          </BlurButton>
        </View>
      </View>
    </View>
  );
};

export default FeatureCard;

