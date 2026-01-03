import React, { useMemo } from 'react';
import { View, Image, Pressable, StyleSheet, ImageSourcePropType, ViewStyle } from 'react-native';
import { StyledText } from '../../ui/text/StyledText';
import { useBrand } from '../../brand';
import { useBreakpoints } from '../../hooks/useWindowWidth';

export interface MediaTileProps {
  // Image
  image: ImageSourcePropType | { uri: string };
  fallbackImage?: ImageSourcePropType | { uri: string };
  
  // Content
  title: string;
  subtitle?: string;
  metadata?: string[]; // Array of metadata strings (e.g., ["$", "2.5 miles away"])
  
  // Behavior
  onPress?: () => void;
  loading?: boolean;
  
  // Sizing (responsive)
  width?: number | { mobile: number; desktop: number };
  height?: number | { mobile: number; desktop: number };
  
  // Styling
  imageStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

/**
 * A general-purpose media tile component that displays an image with title, subtitle, and metadata.
 * Responsive sizing and integrates with the design system theme/brand.
 */
export const MediaTile = ({
  image,
  fallbackImage,
  title,
  subtitle,
  metadata,
  onPress,
  loading,
  width,
  height,
  imageStyle,
  contentStyle,
}: MediaTileProps) => {
  const { isMediumOrLarger } = useBreakpoints();
  const brand = useBrand();
  
  const styles = useMemo(() => StyleSheet.create({
    image: {
      width: '100%',
      borderRadius: brand.borderRadius,
    },
    infoContainer: {
      marginTop: 10,
      gap: 5,
    },
  }), [brand]);

  // Handle responsive sizing
  const getWidth = () => {
    if (typeof width === 'object') {
      return isMediumOrLarger ? width.desktop : width.mobile;
    }
    return width;
  };

  const getHeight = () => {
    if (typeof height === 'object') {
      return isMediumOrLarger ? height.desktop : height.mobile;
    }
    return height;
  };

  // Default responsive sizes if not provided
  const tileWidth = getWidth() ?? (isMediumOrLarger ? 250 : 150);
  const imageHeight = getHeight() ?? (isMediumOrLarger ? 150 : 200);

  // Determine image source
  const imageSource = image || fallbackImage;

  const content = (
    <>
      <Image
        source={imageSource}
        style={[styles.image, { height: imageHeight }, imageStyle]}
        resizeMode={'cover'}
      />
      <View style={[styles.infoContainer, contentStyle]}>
        <StyledText fontSize="md" numberOfLines={1} align="left">
          {title}
        </StyledText>
        {subtitle && (
          <StyledText fontSize={'sm'} numberOfLines={1} align="left" muted>
            {subtitle}
          </StyledText>
        )}
        {metadata && metadata.length > 0 && metadata.map((item, index) => (
          <StyledText key={index} fontSize={'sm'} numberOfLines={1} align="left" muted>
            {item}
          </StyledText>
        ))}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        style={[
          { marginRight: 10 },
          { width: tileWidth },
        ]}
        onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return (
    <View style={[{ marginRight: 10, width: tileWidth }]}>
      {content}
    </View>
  );
};

