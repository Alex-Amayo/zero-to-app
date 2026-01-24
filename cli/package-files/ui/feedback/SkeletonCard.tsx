import React, { useContext, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useBrand } from '../../brand';
import { ThemeContext } from '../../theme';
import { useDimensions, breakpoints } from '../../hooks';

interface SkeletonCardProps {
  width?: number | { mobile: number; web: number };
  imageHeight?: number | { mobile: number; web: number };
  textLines?: number[]; // Array of widths (0-100) for skeleton text lines
}

function SkeletonCard({
  width,
  imageHeight,
  textLines = [70, 40, 30], // Default: 3 lines with different widths
}: SkeletonCardProps) {
  const theme = useContext(ThemeContext);
  const dimensions = useDimensions();
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

  // Determine responsive dimensions
  const cardWidth =
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

  return (
    <View style={[{ marginRight: 10 }, { width: cardWidth }]}>
      <View
        style={[
          styles.skeletonImage,
          { backgroundColor: theme.values.isDark ? '#333333' : '#e0e0e0', height },
        ]}
      />
      <View style={styles.infoContainer}>
        {textLines.map((widthPercent, index) => (
          <View
            key={index}
            style={[
              styles.skeletonText,
              {
                width: `${widthPercent}%`,
                backgroundColor: theme.values.isDark ? '#333333' : '#e0e0e0',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

export { SkeletonCard };

