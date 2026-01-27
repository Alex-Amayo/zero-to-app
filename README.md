# zero-to-app monorepo

[![CI](https://github.com/Alex-Amayo/zero-to-app/actions/workflows/ci.yml/badge.svg)](https://github.com/Alex-Amayo/zero-to-app/actions/workflows/ci.yml)

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

- **UI Components*: Buttons, inputs, cards, forms, navigation, media components, and more
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

# zero-to-app

zero-to-app is a React Native + Expo design system package. It provides a small set of polished UI primitives, a Material-3-aligned theme system, and utilities for cross-platform apps (iOS, Android, Web).

## Installation

Install in your project:

```bash
pnpm add zero-to-app
```

Or with npm:

```bash
npm install zero-to-app
```

## Quick Usage

Wrap your app with the provider and pass a brand created with `createBrand`:

```tsx
import { ZeroToApp, createBrand, Button } from 'zero-to-app';

const brand = createBrand({ name: 'My App', colors: { primary: '#0066CC' } });

export default function App() {
  return (
    <ZeroToApp brand={brand}>
      <Button title="Get started" onPress={() => {}} />
    </ZeroToApp>
  );
}
```

## Main Components (high level)

- `Button` — primary CTA and variants (see `zero-to-app/components/ui/Button.tsx`)
- `Typography` / `StyledText` — semantic typography tokens
- `Card` — surface container
- `useDimensions`, `useWindowWidth`, `useWindowHeight` — responsive hooks
- `ZeroToApp` provider and `createBrand` — brand & theme entrypoints

For full component docs and examples see `apps/storybook/` and `zero-to-app/README.md`.

## Material 3 tokens used (end-user-facing roles)

This library expects and exposes M3-like roles on your brand:

- `primary`, `onPrimary`
- `secondary`, `onSecondary`
- `background`, `onBackground`
- `surface`, `onSurface`, `surfaceVariant`
- `outline`, `outlineVariant`
- `error`, `onError`

When adding new visual tokens, update `zero-to-app/theme/themeConfig.ts` and both light/dark creators.

## Contributing (short)

- Install and run tests locally:

```bash
pnpm install
pnpm dev:storybook:web   # view components
pnpm lint
pnpm typecheck
```

- Follow token rules in `zero-to-app/.cursorrules` when changing theme tokens.
- Make minimal, focused changes; update TypeScript types and unit tests alongside functional changes.
- Open a PR with a concise description and Storybook screenshot(s) when visual changes are involved.

If you want, I can expand the component list with exact exports from `zero-to-app/index.ts` or add short code examples for `useTheme()` usage.
