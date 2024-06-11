import { Colors, FontSizes, BorderRadius } from './brandTypes';

interface Brand {
  colors: Colors;
  fontSizes: FontSizes;   
  borderRadius: BorderRadius;
}

const brand: Brand = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    highlight: '#e74c3c',
    background: '#f5f5f5',
    text: '#333333',
    textAlternate: '#ffffff'
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  borderRadius: 5,
};

export default brand;
