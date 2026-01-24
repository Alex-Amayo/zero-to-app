import React, { useContext, PropsWithChildren, ReactElement, useMemo } from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { ThemeContext } from '../../theme';
import { useDimensions } from '../../hooks';
import Footer from './Footer';
import { useWindowDimensions } from 'react-native';
import { useBrand } from '../../brand';

type WebPageLayoutProps = {
  children: React.ReactNode;
  bottomActions?: ReactElement; // Optional fixed bottom actions (buttons, etc.)
  showFooter?: boolean; // Default true, can hide footer if needed
};

/**
 * Unified web page layout template that handles all conditional layout logic
 * for mobile web and desktop/tablet, including automatic footer placement.
 * 
 * - Mobile web (isWebSmall): Footer at bottom of ScrollView, fills width, reaches bottom
 * - Desktop/Tablet (isWebLarge): Footer at bottom (fixed or end of ScrollView)
 * - Supports optional bottomActions for pages that need fixed bottom buttons
 */
const WebPageLayout = ({ 
  children, 
  bottomActions, 
  showFooter = true 
}: WebPageLayoutProps) => {
  const theme = useContext(ThemeContext);
  const dimensions = useDimensions();
  const brand = useBrand();
  const { height: windowHeight } = useWindowDimensions();
  
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    scrollContentMobile: {
      flexGrow: 1,
    },
    content: {
      // Don't use flex: 1, let content take only what it needs
    },
    contentMobile: {
      // On mobile web, ensure content takes up at least viewport height
      // minHeight is set dynamically to prevent content cutoff
    },
    contentDesktop: {
      // On desktop, expand content to fill available space for fullscreen
      flex: 1,
      minHeight: 0, // Allow shrinking if needed
    },
    bottomActionsMobile: {
      width: '100%',
      paddingVertical: brand.spacing.md + 3,
    },
    footerWrapperMobile: {
      width: '100%',
      flexGrow: 1,
      minHeight: 300, // Minimum height, will expand to fill remaining space
      alignSelf: 'stretch', // Ensure full width
    },
    footerWrapperDesktop: {
      width: '100%',
      alignSelf: 'stretch', // Ensure full width
    },
    fixedBottomContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%', // Ensure full width
    },
  }), [brand]);

  // Mobile web layout: Footer fills remaining height and full width
  if (Platform.OS === 'web' && dimensions.breakpoint === 'small') {
    // Calculate minimum content height to ensure footer can fill remaining space
    const minContentHeight = Platform.OS === 'web' && windowHeight 
      ? windowHeight
      : undefined;
    
    // Calculate minimum height for content area to fill viewport
    // Account for footer minimum height (300px) to ensure content takes up at least one screen
    const contentMinHeight = windowHeight ? Math.max(windowHeight - 300, windowHeight * 0.6) : undefined;

    return (
      <View style={[styles.container, { backgroundColor: theme.values.backgroundColor }]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContentMobile,
            {
              flexGrow: 1,
              ...(minContentHeight && { minHeight: minContentHeight }),
            },
          ]}>
          {/* Content with padding applied here, not to ScrollView */}
          <View style={[
            styles.content, 
            styles.contentMobile, 
            ...(contentMinHeight ? [{ minHeight: contentMinHeight }] : []),
          ]}>
            {children}
          </View>
          {bottomActions && <View style={styles.bottomActionsMobile}>{bottomActions}</View>}
          {/* Footer wrapper - full width, no padding constraints */}
          {showFooter && (
            <View style={styles.footerWrapperMobile}>
              <Footer />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  // Desktop/Tablet layout: Footer at bottom (fixed if bottomActions, otherwise end of ScrollView)
  // Calculate minimum height for desktop to ensure fullscreen
  const isDesktop = Platform.OS === 'web' && dimensions.breakpoint !== 'small';
  const appbarHeight = isDesktop ? 80 : 60;
  const minContentHeight = Platform.OS === 'web' && windowHeight 
    ? windowHeight - appbarHeight
    : undefined;

  return (
    <View style={[styles.container, { backgroundColor: theme.values.backgroundColor }]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            ...(isDesktop && minContentHeight ? [{ minHeight: minContentHeight }] : []),
          ]}>
        {/* Content with padding applied here, not to ScrollView */}
        <View style={[
          styles.content, 
          isDesktop && styles.contentDesktop, // Expand content on desktop
        ]}>
          {children}
        </View>
        {/* Footer wrapper - full width, no padding constraints */}
        {!bottomActions && showFooter && (
          <View style={styles.footerWrapperDesktop}>
            <Footer />
          </View>
        )}
      </ScrollView>
      {/* Fixed bottom container for pages with bottomActions */}
      {bottomActions && (
        <View style={styles.fixedBottomContainer}>
          {bottomActions}
          {showFooter && (
            <View style={styles.footerWrapperDesktop}>
              <Footer />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default WebPageLayout;

