import brand from '../brand/brandConfig';

//Defining types for ThemeValues
export interface ThemeValuesType {
  color: string;
  backgroundColor: string;
  highlightColor: string;
  borderColor: string;
  shadowColor: string;
  inactiveIconColor: string;
  dividerColor: string;
  cardBackgroundColor: string;
  iconButtonBackgroundColor: string;
  iconButtonIconColor: string;
  appbarColor: string;
  isDark: boolean;
}

//Defining light theme
export const lightTheme: ThemeValuesType = {
  color: '#050505', // Text color
  backgroundColor: brand.colors.backgroundColor, // Background color of the entire app
  cardBackgroundColor: '#ffffff', // Background color of cards
  highlightColor: brand.colors.primary, //Primary color of the brand derived from brandConfig
  appbarColor: brand.colors.appbarColor, // App bar color
  borderColor: '#ced0d4', // Border color
  shadowColor: '#000000', // Shadow colors
  inactiveIconColor: '#606770', // Affects icons displayed in navigation bar
  dividerColor: '#dddfe2', // Divider color
  iconButtonBackgroundColor: '#e4e6eb', // Background color of icon buttons
  iconButtonIconColor: '#050505', // Icon color for icon buttons
  isDark: false,
};

//Defining dark theme
export const darkTheme: ThemeValuesType = {
  color: '#e4e6eb', // Text color
  backgroundColor: '#18191a', // Background color of the entire app
  cardBackgroundColor: '#242526', // Background color of cards
  highlightColor: brand.colors.secondary, //Primary color of the brand derived from brandConfig
  appbarColor: '#242526', // App bar color
  borderColor: '#3e4042', // Border color
  shadowColor: '#000000', // Shadow color
  inactiveIconColor: '#b0b3b8', // Affects icons displayed in navigation bar
  dividerColor: '#3e4042', // Divider color
  iconButtonBackgroundColor: '#3a3b3c', // Background color of icon buttons
  iconButtonIconColor: '#e4e6eb', // Icon color for icon buttons
  isDark: true,
};
