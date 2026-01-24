import React, { useContext, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../../theme';
import { useBrand } from '../../brand';
import { StyledText, TextLink } from '../ui';
import { useRouter } from 'expo-router';
import { useDimensions } from '../../hooks';

/**
 * Minimal footer for mobile web
 * Netflix-style footer that fills remaining screen height
 * Shows navigation links vertically with spacing and copyright at bottom
 */
const MinimalFooter = () => {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const dimensions = useDimensions();
  const brand = useBrand();
  
  const styles = useMemo(() => StyleSheet.create({
    container: {
      width: '100%',
      flex: 1, // Fill parent (footerWrapperMobile) which has flexGrow: 1
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      alignSelf: 'stretch', // Ensure full width
    },
    linksContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: brand.spacing.xxl,
      flex: 1,
      width: '100%',
    },
    copyrightContainer: {
      marginTop: brand.spacing.xxl, // Same spacing as gap between links
      width: '100%',
      alignItems: 'flex-start',
    },
  }), [brand]);
  
  // Only show on web (mobile web specifically)
  if (!(Platform.OS === 'web' && dimensions.breakpoint === 'small')) {
    return null;
  }
  
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.values.appbarBackgroundColor,
          borderTopWidth: theme.values.isDark ? 0 : 1,
          borderTopColor: theme.values.borderColor,
          paddingVertical: brand.spacing.xxxl,
          paddingHorizontal: brand.spacing.xl,
        },
      ]}
    >
      {/* Navigation Links - Vertical layout, left-aligned */}
      {brand.footerLinks.links.length > 0 && (
        <View style={styles.linksContainer}>
          {brand.footerLinks.links.map((link, index) => (
            <TextLink
              key={index}
              text={link.text}
              onPress={() => router.push(link.route)}
              align="left"
              color={theme.values.linkColor}
              fontSize="sm"
            />
          ))}
        </View>
      )}
      
      {/* Copyright at bottom */}
      <View style={styles.copyrightContainer}>
        <StyledText fontSize="sm" align="left" muted>
          © 2025 {brand.name}
        </StyledText>
      </View>
    </View>
  );
};

export default MinimalFooter;

