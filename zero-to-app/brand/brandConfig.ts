import { BorderRadius, Colors, FontSizes, FooterLinks, Logo, LogoSource, Name, NavigationConfig, Spacing } from './brandTypes';

export interface Brand {
  colors: Colors;
  fontSizes: FontSizes;
  spacing: Spacing;
  borderRadius: BorderRadius;
  name: Name;
  logo: Logo;
  footerLinks: FooterLinks;
  navigation: NavigationConfig;
}

/**
 * Configuration interface for creating a brand.
 * All properties except logo, footerLinks, and navigation are required - apps must provide complete brand configuration.
 */
export interface BrandConfig {
  name: string;
  colors: Colors;
  fontSizes: FontSizes;
  spacing: Spacing;
  borderRadius: number;
  logo?: Logo;
  footerLinks?: FooterLinks; // Optional - if not provided, footer will not show navigation links
  navigation?: NavigationConfig; // Optional - if not provided, navigation will not show menu items
}

/**
 * Creates a brand configuration from the provided config.
 * All brand values must be provided at the app level - no defaults are provided.
 * 
 * @param config Required configuration with all brand values
 * @returns Brand configuration object
 * 
 * @example
 * // Complete brand configuration required
 * const brand = createBrand({
 *   name: 'My App',
 *   colors: { primary: '#ff0000', secondary: '#00ff00', backgroundColor: '#ffffff' },
 *   fontSizes: { small: 12, medium: 14, large: 18, xlarge: 24 },
 *   spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
 *   borderRadius: 8,
 *   logo: {
 *     light: require('./assets/logo-light.png'),
 *     dark: require('./assets/logo-dark.png'),
 *   },
 * });
 */
export const createBrand = (config: BrandConfig): Brand => {
  return {
    name: config.name,
    colors: config.colors,
    fontSizes: config.fontSizes,
    spacing: config.spacing,
    borderRadius: config.borderRadius,
    logo: config.logo ?? {
      light: undefined,
      dark: undefined,
    },
    footerLinks: config.footerLinks ?? {
      links: [],
    },
    navigation: config.navigation ?? {
      items: [],
    },
  };
};
