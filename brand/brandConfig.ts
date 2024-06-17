import { Colors, FontSizes, Card } from './brandTypes';

interface Brand {
  colors: Colors;
  fontSizes: FontSizes;   
  card: Card;
}

const brand: Brand = {
  colors: {
    primary: '#1a4c9d',
    secondary: '#db4691',
    background: 'white',
    text: '#333333',
    textAlternate: '#ffffff'
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  card: {
    borderRadius: 5,
    shadowOpacity: 0.25,
    elevation: 5,
    shadow: true,
    cardBackground: '#ffffff',
  },
};

export default brand;
