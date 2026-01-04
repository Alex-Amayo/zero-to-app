import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import ReanimatedCarousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

export interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  pagination?: 'dots' | 'numbers' | false;
  paginationPosition?: 'top' | 'bottom';
  autoPlay?: boolean;
  loop?: boolean;
  width?: number;
  height?: number;
  onItemChange?: (index: number) => void;
}

/**
 * Generic carousel component that works with any data type.
 * Supports pagination dots and integrates with the design system.
 */
export const Carousel = <T,>({
  data,
  renderItem,
  pagination = 'dots',
  paginationPosition = 'bottom',
  autoPlay = false,
  loop = true,
  width = screenWidth,
  height = 250,
  onItemChange,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move useMemo to top level - hooks must be called at component top level
  const paginationDots = useMemo(
    () => new Array(data.length).fill(0).map((_, index) => index),
    [data.length],
  );

  const handleProgressChange = (offsetProgress: number, absoluteProgress: number) => {
    const newIndex = Math.round(absoluteProgress) % data.length;
    setCurrentIndex(newIndex);
    onItemChange?.(newIndex);
  };

  const renderPagination = () => {
    if (pagination === false || data.length <= 1) return null;

    return (
      <View
        style={[
          styles.paginationWrapper,
          paginationPosition === 'top' ? styles.paginationTop : styles.paginationBottom,
        ]}>
        {paginationDots.map((key, index) => (
          <View
            key={`dot-${key}`}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.paginationDotActive : null,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ position: 'relative', height: height, width: width }}>
      <ReanimatedCarousel
        loop={loop}
        width={width}
        height={height}
        autoPlay={autoPlay}
        data={data}
        scrollAnimationDuration={500}
        onProgressChange={(_, absoluteProgress) => handleProgressChange(_, absoluteProgress)}
        renderItem={({ item, index }) => <>{renderItem(item, index)}</>}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationTop: {
    top: 16,
  },
  paginationBottom: {
    bottom: 16,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginHorizontal: 4,
    opacity: 0.5,
  },
  paginationDotActive: {
    opacity: 1,
  },
});

