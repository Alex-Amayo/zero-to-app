# zero-to-app

A React Native design system with a CLI tool to install and use components in your projects.

🌐 **Components Demos:** [https://zero-to-app.expo.app](https://zero-to-app.expo.app)

## Installation

Install zero-to-app into your React Native or Expo project:

```bash
npx zero-to-app
```

This command will:
1. Download the latest design system package from GitHub
2. Copy it to `./zero-to-app/` in your project directory
3. Automatically install any missing dependencies

### Installation Options

```bash
# Force overwrite existing directory
npx zero-to-app --force

# Skip dependency installation
npx zero-to-app --skip-install

# Use specific package manager
npx zero-to-app --package-manager yarn
```

## Quick Start

### 1. Wrap Your App with ZeroToApp Provider

In your root layout file (e.g., `app/_layout.tsx` or `App.tsx`):

```typescript
import { ZeroToApp, createBrand } from './zero-to-app';

export default function Root() {
  const brand = createBrand({
    name: 'My App',
    colors: {
      primary: '#cc3366',
      secondary: '#cc3366',
      backgroundColor: '#fafafc',
    },
    fontSizes: {
      small: 14,
      medium: 16,
      large: 20,
      xlarge: 25,
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      xxxl: 40,
    },
    borderRadius: 5,
  });

  return (
    <ZeroToApp brand={brand}>
      {/* Your app components */}
    </ZeroToApp>
  );
}
```

### 2. Use Components in Your App

```typescript
import { StyledText, Button, Card, useDimensions } from './zero-to-app';

function MyComponent() {
  const dimensions = useDimensions();
  
  return (
    <Card>
      <StyledText fontSize="lg" bold>Welcome</StyledText>
      <Button title="Get Started" onPress={() => {}} />
    </Card>
  );
}
```

## What's Included

- **30+ UI Components**: Buttons, inputs, cards, forms, navigation, media components, and more
- **Theme System**: Built-in light and dark mode support
- **Brand Configuration**: Fully customizable colors, fonts, spacing, and branding
- **Responsive Utilities**: Hooks and utilities for responsive design
- **Cross-Platform**: Works on iOS, Android, and Web

## Documentation

- **Component Documentation**: See [`package/README.md`](package/README.md) for complete component reference
- **CLI Documentation**: See [`cli/README.md`](cli/README.md) for CLI options and details

## Requirements

The CLI will automatically install these dependencies if they're missing:
- `react-hook-form` - Form validation
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `react-native-reanimated-carousel` - Carousel component
- `@shopify/flash-list` - High-performance list component
- `lottie-react-native` - Lottie animations
- `expo-blur` - Blur effects
- `expo-glass-effect` - Glass effect

## Repository Structure

This is a monorepo containing:

- **`package/`** - The core design system package (installed into your project)
- **`cli/`** - The CLI installation tool
- **`apps/demo/`** - Demo Expo app showcasing components

## Development

For contributors working on this repository:

```bash
# Install dependencies
pnpm install

# Run demo app
pnpm dev

# Build CLI
pnpm build:cli
```

## License

MIT
