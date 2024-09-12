import { BorderRadius, Colors, FontSizes, Name, Shadows, Logo, BackgroundColor } from './brandTypes';

interface Brand {
  colors: Colors;
  fontSizes: FontSizes;
  borderRadius: BorderRadius;
  name: Name;
  logo: Logo;
  shadows: Shadows;
  backgroundColor: BackgroundColor;
}

const brand: Brand = {
  name: 'Zero To App',
  backgroundColor: '#ec6140',
  borderRadius: 10,
  shadows: true,
  colors: {
    primary: '#1a4c9d',
    secondary: '#db4691',
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  logo: {
    light: 'https://utfs.io/f/6f54a643-3891-4def-9ee0-75165f57ffc2-1zbfv.png',
    dark: 'https://utfs.io/f/0f641941-fe3a-447e-bff3-a9ea1201006c-qkt02w.png',
  },
};

export default brand;
