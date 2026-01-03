import React, { useContext, useMemo } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { StyledText } from '../text/StyledText';
import { useBrand } from '../../brand';
import { ThemeContext } from '../../theme';
import { useDimensions, breakpoints } from '../../hooks';

interface TileProps {
  imageUrl: string | number;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  width?: number | { mobile: number; web: number };
  imageHeight?: number | { mobile: number; web: number };
  showSkeleton?: boolean;
}

const Tile = ({
  imageUrl,
  title,
  subtitle,
  onPress,
  width,
  imageHeight,
  showSkeleton = false,
}: TileProps) => {
  const theme = useContext(ThemeContext);
  const dimensions = useDimensions();
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

  // Determine responsive dimensions
  const tileWidth =
    typeof width === 'object'
      ? dimensions.width > breakpoints.medium
        ? width.web
        : width.mobile
      : width || (dimensions.width > breakpoints.medium ? 250 : 150);

  const height =
    typeof imageHeight === 'object'
      ? dimensions.width > breakpoints.medium
        ? imageHeight.web
        : imageHeight.mobile
      : imageHeight || (dimensions.width > breakpoints.medium ? 150 : 200);

  if (showSkeleton) {
    // Skeleton will be handled by SkeletonCard component
    return null;
  }

  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;

  return (
    <Pressable
      style={[{ marginRight: 10 }, { width: tileWidth }]}
      onPress={onPress}
      disabled={!onPress}>
      <Image source={imageSource} style={[styles.image, { height }]} resizeMode={'cover'} />
      <View style={styles.infoContainer}>
        <StyledText fontSize="md" numberOfLines={1} align="left">
          {title}
        </StyledText>
        {subtitle && (
          <StyledText fontSize={'sm'} numberOfLines={1} align="left" muted>
            {subtitle}
          </StyledText>
        )}
      </View>
    </Pressable>
  );
};

export { Tile };

