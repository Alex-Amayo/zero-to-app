import React, { useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDimensions } from '../../../hooks';
import { useBrand } from '../../../brand';
import { ThemeContext } from '../../../theme';
import { Platform } from 'react-native';
import IconButtonGroup from './IconButtonGroup';
import AppbarBranding from './Logo';
import MobileMenuDrawer from './MobileMenuDrawer';

type AppbarProps = {
  title?: string;
  logoUri?: string;
  tabs?: JSX.Element | JSX.Element[];
  currentRoute?: string;
  onNavigate?: (route: string) => void;
};

/**
 * A responsive appbar that displays at the top of the page.
 * Dynamically adapts its styling when the viewport is less than medium
 * On mobile web: Logo + Hamburger menu
 * On desktop/tablet: Logo + Top tabs + Theme toggle
 */

const AppbarWeb = ({ title, logoUri, tabs, currentRoute, onNavigate }: AppbarProps) => {
  //Initialize theme
  const theme = useContext(ThemeContext);
  //Use dimensions hook
  const dimensions = useDimensions();
  const brand = useBrand();
  
  const styles = useMemo(() => StyleSheet.create({
    appbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 80,
      paddingHorizontal: '5%',
    },
    appbarWebSmall: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 80,
      width: '100%',
      paddingHorizontal: brand.spacing.xl,
    },
    iconContainer: {
      flexDirection: 'row',
      gap: brand.spacing.sm + 2,
    },
    logo: {
      width: 40,
      height: 40,
    },
    title: {
      fontSize: brand.fontSizes.large,
      fontWeight: 'bold',
      marginLeft: brand.spacing.sm + 2,
    },
    webContainer: {}, // WebContainer property for additional styling
  }), [brand]);

  return (
      <View
      style={{
        //Configure a background with a theme background
        backgroundColor: theme.values.appbarBackgroundColor,
        // Ensure appbar appears above content
        zIndex: 10,
        position: 'relative',
      }}>
      <View
        style={{
          ...styles.webContainer,          //Configure appbar with theme appbar background color
          backgroundColor: theme.values.appbarBackgroundColor,
          ...(!theme.values.isDark && { borderBottomWidth: 1, borderBottomColor: theme.values.borderColor }),
        }}>
        <View
          style={{
            ...styles.appbar,
            height: Platform.OS === 'web' && dimensions.breakpoint === 'small' ? 60 : 80,
          }}>
          <AppbarBranding logoUri={logoUri} />
          {!(Platform.OS === 'web' && dimensions.breakpoint === 'small') ? tabs : null}
          {Platform.OS === 'web' && dimensions.breakpoint === 'small' ? (
            <MobileMenuDrawer currentRoute={currentRoute} onNavigate={onNavigate} logoUri={logoUri} />
          ) : (
            <IconButtonGroup />
          )}
        </View>
      </View>
    </View>
  );
};
export default AppbarWeb;
