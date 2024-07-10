import brand from '../brand/brandConfig';

//Defining types for ThemeValues
export type ThemeValuesType = {
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
};

//Defining light theme
export const lightTheme: ThemeValuesType = {
  color: '#000000',
  backgroundColor: '#ECF3FF',
  cardBackgroundColor: '#FFFFFF',
  highlightColor: brand.colors.primary,
  appbarColor: '#FFFFFF',
  borderColor: '#F2F2F7FF',
  shadowColor: '#000000',
  inactiveIconColor: '#65676b',
  dividerColor: '#DDDDDD',
  iconButtonBackgroundColor: '#E4E6EB',
  iconButtonIconColor: '#000000',
  isDark: false,
};

//Defining dark theme
export const darkTheme: ThemeValuesType = {
  color: '#FFFFFF',
  backgroundColor: '#000000',
  cardBackgroundColor: '#18191a',
  highlightColor: brand.colors.secondary,
  appbarColor: '#1C1C1EFF',
  borderColor: '#1C1C1EFF',
  shadowColor: '',
  inactiveIconColor: '#808080',
  dividerColor: '#808080',
  iconButtonBackgroundColor: '#3a3b3c',
  iconButtonIconColor: '#FFFFFF',
  isDark: true,
};
