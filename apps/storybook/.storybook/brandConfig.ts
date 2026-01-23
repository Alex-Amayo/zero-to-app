import { createBrand } from 'zero-to-app';

export const storybookBrand = createBrand({
  name: 'Storybook',
  colors: {
    primary: '#ff5757',
    secondary: '#ff5757',
    backgroundColor: '#fff',
  },
  fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: 8,
});
