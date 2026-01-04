// Branding types for the application
import { ImageSourcePropType } from 'react-native';

export type Name = string;
export type BorderRadius = number;

export interface Colors {
  primary: string;
  secondary: string;
  backgroundColor: string;
}

export interface FontSizes {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

// Logo can be ImageSourcePropType (require) or string URI
export type LogoSource = ImageSourcePropType | string;

export interface LogoConfig {
  light?: LogoSource;
  dark?: LogoSource;
}

export interface FooterLink {
  text: string;
  route: string;
}

export interface FooterLinks {
  links: FooterLink[];
  aboutText?: string; // Optional custom text for the "About" link (defaults to "About {brand.name}")
}

// Icon libraries available from @expo/vector-icons
export type IconLibrary = 
  | 'Feather' 
  | 'MaterialIcons' 
  | 'Ionicons' 
  | 'FontAwesome' 
  | 'AntDesign' 
  | 'Entypo' 
  | 'EvilIcons' 
  | 'Foundation' 
  | 'MaterialCommunityIcons' 
  | 'Octicons' 
  | 'SimpleLineIcons' 
  | 'Zocial';

// Platform-specific icon configuration
export interface PlatformIcon {
  library?: IconLibrary; // Default: 'Feather' for web/Android, 'SF Symbols' for iOS native tabs
  name: string;
}

// Navigation icon configuration with backward compatibility
// Supports both string format (backward compat - assumes Feather) and explicit PlatformIcon format
export interface NavigationIcon {
  // String format (backward compatible): assumes Feather library
  // PlatformIcon format (explicit): specifies library and name
  web?: PlatformIcon | string;
  mobile?: PlatformIcon | string; // For iOS native tabs: name is SF Symbol name (library ignored)
}

export interface NavigationItem {
  route: string; // Full route path (e.g., '/(tabs)/home')
  title: string; // Display title
  icon: NavigationIcon; // Platform-specific icons
}

export interface NavigationConfig {
  items: NavigationItem[];
}
