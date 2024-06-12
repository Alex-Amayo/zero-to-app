
// Branding types for the application

export interface Colors {
    primary: string;
    secondary: string;
    highlight: string;
    background: string;
    text: string;
    textAlternate: string;
  }
  
  export interface FontSizes {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  }

  export interface Card {
    borderRadius: number;
    shadowOpacity: number;
    elevation: number;
    shadow: boolean;
    cardBackground: string;
  }

export type BorderRadius = number;