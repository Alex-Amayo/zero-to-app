import type { PropsWithChildren, ReactElement } from "react";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset,
  type SharedValue,
} from "react-native-reanimated";

import { useScrollContext } from "../../context/scrollContext";
import { ThemeContext } from "../../theme";

export const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: string;
  headerHeight?: number;
  headerAction?: ReactElement;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  headerHeight = HEADER_HEIGHT,
  headerAction,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const theme = useContext(ThemeContext);

  // Safely try to get the context, but don't throw an error if it's not available
  let scrollY: SharedValue<number> | null = null;
  try {
    scrollY = useScrollContext();
  } catch (error) {
    // Context not available, scrollY will be undefined
  }

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
        [1, 0.5, 0],
        'clamp'
      ),
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  // Create a scroll handler that updates scrollY only if it exists
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (scrollY) {
        scrollY.value = event.contentOffset.y;
      }
    }
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.values.backgroundColor }]}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={scrollHandler}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor, height: headerHeight },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>

        {children}
      </Animated.ScrollView>
      
      {headerAction && (
        <View style={styles.headerAction}>
          <SafeAreaView style={styles.safeAreaContainer}>
            {headerAction}
          </SafeAreaView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    overflow: "hidden",
  },
  headerAction: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 0,
    zIndex: 1,
  },
  safeAreaContainer: {
    paddingHorizontal: '2%',
  },
});