# zero-to-app monorepo

Monorepo for the `zero-to-app` React Native design system package. The publishable package lives in `zero-to-app/`.

🌐 **Components Demos:** [https://zero-to-app.expo.app](https://zero-to-app.expo.app)

## Installation

Install zero-to-app into your React Native or Expo project:

```bash
pnpm add zero-to-app
```

Or with npm:

```bash
npm install zero-to-app
```

## Quick Start

### 1. Wrap Your App with ZeroToApp Provider

In your root layout file (e.g., `app/_layout.tsx` or `App.tsx`):

```typescript
import { ZeroToApp, createBrand } from 'zero-to-app';

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
import { StyledText, Button, Card, useDimensions } from 'zero-to-app';

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

- **Component Documentation**: See [`zero-to-app/README.md`](zero-to-app/README.md) for complete component reference

## Requirements

The design system depends on these packages:
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

- **`zero-to-app/`** - The core design system package (published as `zero-to-app`)
- **`apps/storybook/`** - Storybook (web + Expo) for component development
- **`apps/demo/`** - Demo Expo app showcasing components

## Development

For contributors working on this repository:

```bash
# Install dependencies
pnpm install

# View all available scripts
pnpm help
```

### Development Scripts

Start development servers for local development:

```bash
# Storybook
pnpm dev:storybook          # Start Storybook (native Expo)
pnpm dev:storybook:web      # Start Storybook web dev server

# Demo App
pnpm dev:demo               # Start demo app
pnpm dev:demo:ios           # Start demo on iOS
pnpm dev:demo:android       # Start demo on Android
pnpm dev:demo:web           # Start demo on web
```

### Build Scripts

Build production artifacts:

```bash
pnpm build                  # Build zero-to-app package
pnpm build:storybook        # Build Storybook static files
pnpm build:demo             # Build demo web export
pnpm build:all               # Build everything (package + storybook + demo)
```

### Deploy Scripts

Publish updates to demo app:

```bash
pnpm deploy:demo            # Publish demo OTA update (production)
pnpm deploy:demo:preview    # Publish demo OTA update (preview)
```

### Release Scripts

Publish the design system package:

```bash
pnpm release                # Publish zero-to-app package to npm
```

### Quality Scripts

Code quality and linting:

```bash
pnpm lint                   # Lint code
pnpm lint:fix               # Lint and fix issues
```

## License

MIT
