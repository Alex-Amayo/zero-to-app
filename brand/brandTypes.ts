// Branding types for the application

export type Name = string;
export type BorderRadius = number;
export type Shadows = boolean;
export type BackgroundColor = string;

export interface Colors {
  primary: string;
  secondary: string;
}

export interface FontSizes {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
}

export interface Logo {
  light: string;
  dark: string;
}
