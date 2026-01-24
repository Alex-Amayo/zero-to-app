import { Brand } from '../brand';

//Defining types for ThemeValues
export interface ThemeValuesType {
  color: string;
  backgroundColor: string;
  highlightColor: string;
  borderColor: string;
  inactiveIconColor: string;
  dividerColor: string;
  cardBackgroundColor: string;
  appbarBackgroundColor: string;
  iconButtonBackgroundColor: string;
  iconButtonIconColor: string;
  inputBackgroundColor: string;
  linkColor: string;
  isDark: boolean;
}

//Defining light theme factory function
export const createLightTheme = (brand: Brand): ThemeValuesType => {
  if (!brand || !brand.colors) {
    throw new Error('createLightTheme: brand parameter must be a valid Brand object with colors');
  }
  return {
    color: '#000000', // Text color
    backgroundColor: '#FFFFFF', // Background color of the entire app
    cardBackgroundColor: '#FFFFFF', // Background color of cards
    appbarBackgroundColor: '#FFFFFF', // Background color of the appbar
    highlightColor: brand.colors.primary, //Primary color of the brand derived from brandConfig
    borderColor: '#dddfe2', // Border color
    inactiveIconColor: '#606770', // Affects icons displayed in navigation bar
    dividerColor: '#dddfe2', // Divider color
    iconButtonBackgroundColor: '#999999', // Background color of icon buttons
    iconButtonIconColor: '#ffffff', // Icon color for icon buttons
    inputBackgroundColor: '#ffffff', // Input field background color
    linkColor: '#666666', // Link text color for light mode
    isDark: false,
  };
};

//Defining dark theme factory function
export const createDarkTheme = (brand: Brand): ThemeValuesType => {
  if (!brand || !brand.colors) {
    throw new Error('createDarkTheme: brand parameter must be a valid Brand object with colors');
  }
  return {
    color: '#FFFFFF', // Text color
    backgroundColor: '#212121', // Background color of the entire app
    cardBackgroundColor: '#181818', // Background color of cards
    appbarBackgroundColor: '#000000', // Background color of the appbar
    highlightColor: brand.colors.secondary, //Primary color of the brand derived from brandConfig
    borderColor: '#424242', // Border color
    inactiveIconColor: '#b0b3b8', // Affects icons displayed in navigation bar
    dividerColor: '#3e4042', // Divider color
    iconButtonBackgroundColor: '#3a3b3c', // Background color of icon buttons
    iconButtonIconColor: '#ffffff', // Icon color for icon buttons
    inputBackgroundColor: '#3a3b3c', // Input field background color
    linkColor: '#999999', // Link text color for dark mode
    isDark: true,
  };
};
