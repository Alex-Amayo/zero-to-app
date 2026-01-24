import React, { useMemo } from 'react';
import { View, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useBrand } from '../../../brand';
import { StyledText } from '../../../ui/text/StyledText';
import { useDimensions } from '../../../hooks';
import { ThemeContext } from '../../../theme';
import { Platform } from 'react-native';

type AppBarBrandingProps = {
  /**
   * Optional logo image source. Can be a string URI or ImageSourcePropType (require).
   * If provided, this takes precedence over brand config logos.
   */
  logoUri?: string | ImageSourcePropType;
};

/**
 * Appbar with optional Logo for the business
 * Supports URI strings, ImageSourcePropType, or brand config logos
 * Priority: logoUri > brand config > fallback
 */

const Logo = ({ logoUri }: AppBarBrandingProps) => {
  const dimensions = useDimensions();
  const theme = React.useContext(ThemeContext);
  const brand = useBrand();

  // Determine image source with priority: logoUri > brand config > undefined
  const getImageSource = () => {
    if (logoUri) {
      // If logoUri is provided, use it (supports both string URIs and ImageSourcePropType)
      return typeof logoUri === 'string' ? { uri: logoUri } : logoUri;
    }
    
    // Fall back to brand config logos
    const brandLogo = theme.values.isDark ? brand.logo.dark : brand.logo.light;
    if (brandLogo) {
      return typeof brandLogo === 'string' ? { uri: brandLogo } : brandLogo;
    }
    
    // No logo available
    return undefined;
  };

  const imageSource = getImageSource();

  // Don't render if no image source is available
  if (!imageSource) {
    return null;
  }

  return (
    <Link href="/">
      <View
        style={{
          ...styles.container,
          width: dimensions.breakpoint !== 'small' ? 150 : 'auto',
        }}>
        <Image
          source={imageSource}
          style={[
            styles.logo,
            Platform.OS === 'web' && dimensions.breakpoint === 'small' && styles.logoMobile,
          ]}
        />
      </View>
    </Link>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
  },
  logo: {
    marginTop: 12,
    width: 200,
    height: 50,
  },
  logoMobile: {
    width: 150,
    height: 38,
  },
});
