import React, { useContext, useMemo } from 'react';
import { View, StyleSheet, type DimensionValue } from 'react-native';
import { ThemeContext } from '../../theme';
import { useBrand } from '../../brand';
import { useBreakpoints } from '../../hooks/useWindowWidth';

export interface SkeletonMediaTileProps {
  width?: number | { mobile: number; desktop: number };
  height?: number | { mobile: number; desktop: number };
  metadataCount?: number; // Number of metadata skeleton lines
}

/**
 * Skeleton loading state for MediaTile component.
 * Provides consistent loading states with responsive sizing.
 */
export const SkeletonMediaTile = ({
  width,
  height,
  metadataCount = 2,
}: SkeletonMediaTileProps) => {
  const theme = useContext(ThemeContext);
  const { isMediumOrLarger } = useBreakpoints();
  const brand = useBrand();
  
  const styles = useMemo(() => StyleSheet.create({
    skeletonImage: {
      width: '100%',
      borderRadius: brand.borderRadius,
    },
    infoContainer: {
      marginTop: 10,
      gap: 5,
    },
    skeletonText: {
      height: 10,
      borderRadius: 4,
      marginTop: 5,
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

  const skeletonColor = theme.values.isDark ? '#333333' : '#e0e0e0';
  const skeletonWidths = ['70%', '40%', '30%'];

  return (
    <View
      style={[
        { width: tileWidth, marginRight: 10 },
      ]}>
      <View
        style={[
          styles.skeletonImage,
          { backgroundColor: skeletonColor, height: imageHeight },
        ]}
      />
      <View style={styles.infoContainer}>
        <View
          style={[
            styles.skeletonText,
            {
              width: (skeletonWidths[0] || '70%') as DimensionValue,
              backgroundColor: skeletonColor,
            },
          ]}
        />
        {Array.from({ length: metadataCount }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.skeletonText,
              {
                width: (skeletonWidths[index + 1] || '40%') as DimensionValue,
                backgroundColor: skeletonColor,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

