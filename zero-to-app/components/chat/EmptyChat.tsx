import React, { useEffect, useContext } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { StyledText } from '../ui';
import { ThemeContext } from '../../theme';
import { useDimensions } from '../../hooks';
import { ChatInput } from './ChatInput';

interface EmptyChatProps {
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  /**
   * Mascot image. Can be an ImageSourcePropType (require) or string URI.
   */
  mascotImage: ImageSourcePropType | string;
}

/**
 * EmptyChat - Pure content component for empty chat state
 * Displays mascot, welcome text, and chat input
 * Layout-agnostic: parent handles WebPageLayout, background, etc.
 */
const EmptyChat = ({ isLoading, onSendMessage, mascotImage }: EmptyChatProps): React.JSX.Element => {
  const theme = useContext(ThemeContext);
  const dimensions = useDimensions();
  
  // Create shared value for the hover animation
  const translateY = useSharedValue(0);

  // Set up the floating animation
  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-15, {
        duration: 1000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1, // infinite repeat
      true, // reverse animation (up and down)
    );
  }, [translateY]);

  // Create animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // Detect mobile web breakpoint
  const isMobileWeb = Platform.OS === 'web' && dimensions.breakpoint === 'small';
  const isWeb = Platform.OS === 'web';
  
  // Responsive mascot sizing
  const mascotWidth = isMobileWeb ? 100 : 160;
  const mascotHeight = isMobileWeb ? 150 : 240;
  
  // Responsive container styles
  const containerGap = isMobileWeb ? 24 : (isWeb ? 40 : 20);
  const containerPadding = isMobileWeb ? 16 : 20;
  const containerMinHeight = isMobileWeb ? undefined : (isWeb ? 400 : undefined);

  // Handle image source
  const imageSource = typeof mascotImage === 'string' ? { uri: mascotImage } : mascotImage;

  return (
    <View style={[
      styles.container, 
      Platform.OS === 'ios' && { paddingBottom: 100 },
      { gap: containerGap, padding: containerPadding },
      containerMinHeight && { minHeight: containerMinHeight },
    ]}>
      <Animated.View style={animatedStyle}>
        <Image 
          source={imageSource} 
          style={[styles.mascot, { width: mascotWidth, height: mascotHeight }]} 
        />
      </Animated.View>
      <StyledText fontSize={isWeb ? 'lg' : 'md'} align="center" color={theme.values.color}>
        Get personalized recommendations and answers to your nightlife questions.
      </StyledText>
      <ChatInput loading={isLoading} onSendMessage={onSendMessage} />
    </View>
  );
};

export default EmptyChat;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1, // Use flex: 1 on all platforms
  },
  mascot: {
    // Size is set dynamically based on breakpoint
  },
});
