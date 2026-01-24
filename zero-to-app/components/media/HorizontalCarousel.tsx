import React, { useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { ArrowButton } from '../ui';
import { useDimensions, breakpoints } from '../../hooks';

interface HorizontalCarouselProps<T> {
  data: T[] | undefined;
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T) => string;
  headerWidth?: number;
}

/**
 * HorizontalCarousel component with horizontal scrolling and arrow navigation
 * Displays items in a horizontal scrollable list with optional arrow buttons
 * Uses FlatList for performance
 */
function HorizontalCarousel<T>({
  data,
  renderItem,
  keyExtractor,
  headerWidth,
}: HorizontalCarouselProps<T>) {
  const flatListRef = useRef<FlatList<T>>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const scrollList = (direction: 'left' | 'right') => {
    if (flatListRef.current) {
      const newOffset =
        direction === 'left'
          ? Math.max(0, scrollOffset - (300 + 10) * 3)
          : scrollOffset + (310 + 10) * 3;
      flatListRef.current.scrollToOffset({
        offset: newOffset,
        animated: true,
      });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };

  const handleContentSizeChange = (contentWidth: number) => {
    setContentWidth(contentWidth);
  };

  const dimensions = useDimensions();

  const hideLeftArrow = scrollOffset <= 0;
  const hideRightArrow = scrollOffset >= contentWidth - dimensions.width;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        ListHeaderComponent={Platform.OS === 'ios' ? <View style={{ width: headerWidth || 20 }} /> : null}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={handleContentSizeChange}
        style={styles.list}
      />
      {dimensions.width > breakpoints.small && !hideLeftArrow && (
        <View style={styles.leftArrowContainer}>
          <ArrowButton
            direction="left"
            onPress={() => scrollList('left')}
            hidden={hideLeftArrow}
          />
        </View>
      )}
      {dimensions.width > breakpoints.small && !hideRightArrow && (
        <View style={styles.rightArrowContainer}>
          <ArrowButton
            direction="right"
            onPress={() => scrollList('right')}
            hidden={hideRightArrow}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  leftArrowContainer: {
    position: 'absolute',
    left: -25,
    top: '50%',
    zIndex: 10,
    transform: [{ translateY: -25 }],
  },
  rightArrowContainer: {
    position: 'absolute',
    right: -25,
    top: '50%',
    zIndex: 10,
    transform: [{ translateY: -25 }],
  },
});

export { HorizontalCarousel };

