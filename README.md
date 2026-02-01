# zero-to-app

[![CI](https://github.com/Alex-Amayo/zero-to-app/actions/workflows/ci.yml/badge.svg)](https://github.com/Alex-Amayo/zero-to-app/actions/workflows/ci.yml)

A Material Design 3 component library for React Native and Expo, supporting iOS, Android, and Web platforms.

🌐 **Live Demo:** [https://zero-to-app.expo.app](https://zero-to-app.expo.app)

---

## Installation

```bash
npm install zero-to-app
# or
pnpm add zero-to-app
```

### Peer Dependencies

Install required peer dependencies:

```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-screens expo-router
```

Optional dependencies (for specific components):

```bash
npx expo install expo-blur expo-glass-effect @shopify/flash-list lottie-react-native react-native-reanimated-carousel
```

---

## Quick Start

### 1. Wrap Your App with ZeroToApp Provider

In your root layout file (e.g., `app/_layout.tsx`):

```tsx
import { ZeroToApp, createBrand } from 'zero-to-app';

export default function RootLayout() {
  const brand = createBrand({
    name: 'My App',
    colors: {
      primary: '#6200EE',
      onPrimary: '#FFFFFF',
      // ... other M3 color tokens
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
    borderRadius: 8,
  });

  return (
    <ZeroToApp brand={brand}>
      {/* Your app content */}
    </ZeroToApp>
  );
}
```

### 2. Use Components

```tsx
import { Button, Typography, ThemedView } from 'zero-to-app';

function MyScreen() {
  return (
    <ThemedView variant="surface">
      <Typography variant="headlineMedium">Welcome</Typography>
      <Button
        title="Get Started"
        variant="filled"
        onPress={() => console.log('Pressed')}
      />
    </ThemedView>
  );
}
```

---

## Material Design 3 Tokens

This library implements the Material Design 3 color system. All color tokens must be provided via the `createBrand()` function.

### Required Color Tokens

| Token | Purpose | Example |
|-------|---------|---------|
| `primary` | Primary brand color | `#6200EE` |
| `onPrimary` | Text/icons on primary | `#FFFFFF` |
| `primaryContainer` | Container using primary | `#EADDFF` |
| `onPrimaryContainer` | Text on primary container | `#21005E` |
| `secondary` | Secondary brand color | `#03DAC6` |
| `onSecondary` | Text/icons on secondary | `#000000` |
| `secondaryContainer` | Container using secondary | `#B2F1E8` |
| `onSecondaryContainer` | Text on secondary container | `#00201C` |
| `tertiary` | Tertiary accent color | `#03A9F4` |
| `onTertiary` | Text/icons on tertiary | `#FFFFFF` |
| `tertiaryContainer` | Container using tertiary | `#B3E5FC` |
| `onTertiaryContainer` | Text on tertiary container | `#001F28` |
| `error` | Error state color | `#B00020` |
| `onError` | Text/icons on error | `#FFFFFF` |
| `errorContainer` | Container for errors | `#FDECEA` |
| `onErrorContainer` | Text on error container | `#410002` |
| `surface` | Background surface | `#FFFFFF` |
| `onSurface` | Primary text on surface | `#1C1B1F` |
| `surfaceVariant` | Variant surface color | `#E7E0EC` |
| `onSurfaceVariant` | Text on surface variant | `#49454F` |
| `outline` | Border/divider color | `#79747E` |
| `outlineVariant` | Subtle borders | `#CAC4D0` |
| `surfaceContainer*` | Surface elevation levels | Various |
| `inverseSurface` | Inverse surface (tooltips) | `#313033` |
| `inverseOnSurface` | Text on inverse surface | `#F4EFF4` |
| `inversePrimary` | Primary color on inverse | `#D0BCFF` |
| `scrim` | Overlay scrim | `#000000` |
| `shadow` | Shadow color | `#000000` |

### Semantic Tokens

The library provides semantic tokens for common use cases (auto-generated from M3 tokens):

```tsx
import { useTheme } from 'zero-to-app';

function MyComponent() {
  const { values } = useTheme();

  // Button tokens
  values.tokens.button.filledBg
  values.tokens.button.filledText

  // Input tokens
  values.tokens.input.background
  values.tokens.input.border

  // Typography tokens
  values.tokens.typography.headlineLarge
  values.tokens.typography.bodyMedium
}
```

---

## Components

### Navigation

#### AppTabs
Native tab navigation for iOS and Android with automatic icon rendering.

```tsx
import { AppTabs } from 'zero-to-app';

// Configure via brand:
const brand = createBrand({
  // ...
  navigation: {
    items: [
      {
        route: '/(tabs)/home',
        title: 'Home',
        icon: {
          web: { library: 'Feather', name: 'home' },
          mobile: 'house' // SF Symbol on iOS, Feather on Android
        }
      },
    ]
  }
});
```

**Note:** AppTabs requires expo-router and is difficult to mock in Storybook. Test in the demo app instead.

### UI

#### Button
Material Design 3 button with five variants.

```tsx
<Button title="Save" variant="filled" onPress={() => {}} />
<Button title="Cancel" variant="outlined" onPress={() => {}} />
<Button title="Delete" variant="text" onPress={() => {}} />
<Button title="Action" variant="tonal" onPress={() => {}} />
<Button title="Float" variant="elevated" onPress={() => {}} />
```

**Props:**
- `title: string` - Button text
- `variant?: 'filled' | 'elevated' | 'tonal' | 'outlined' | 'text'` - Visual style (default: 'filled')
- `onPress?: () => void` - Press handler
- `loading?: boolean` - Show loading spinner
- `disabled?: boolean` - Disable interaction
- `icon?: IconConfig` - Optional icon
- `iconPosition?: 'left' | 'right'` - Icon position (default: 'right')
- `size?: 'xs' | 's' | 'm' | 'l' | 'xl'` - Button size (default: 's')

#### Typography
Type-safe typography component with M3 type scale.

```tsx
<Typography variant="displayLarge">Hero Title</Typography>
<Typography variant="headlineMedium" weight="bold">Section</Typography>
<Typography variant="bodyMedium">Body text</Typography>
<Typography variant="labelSmall" color="#FF0000">Label</Typography>
```

**Props:**
- `variant?: TypographyVariant` - M3 type scale variant
- `weight?: 'light' | 'regular' | 'medium' | 'bold'` - Font weight
- `color?: string` - Text color
- `align?: 'left' | 'center' | 'right'` - Text alignment
- `numberOfLines?: number` - Limit lines

**Variants:** `displayLarge`, `displayMedium`, `displaySmall`, `headlineLarge`, `headlineMedium`, `headlineSmall`, `titleLarge`, `titleMedium`, `titleSmall`, `bodyLarge`, `bodyMedium`, `bodySmall`, `labelLarge`, `labelMedium`, `labelSmall`

#### ThemedView
Container component with automatic theme-aware styling.

```tsx
<ThemedView variant="surface">
  <Typography>Content</Typography>
</ThemedView>
```

**Props:**
- `variant?: 'background' | 'surface' | 'surfaceVariant' | 'primary' | 'secondary'`
- `style?: ViewStyle` - Additional styles

### Utils

#### Icon Utilities
Helper functions for rendering icons from various libraries.

```tsx
import { renderIcon } from 'zero-to-app';

// Used internally by Button, AppTabs, etc.
renderIcon(
  { name: 'home', size: 24 },
  'Feather',
  24,
  '#000000'
)
```

Supported libraries: Feather, MaterialIcons, Ionicons, FontAwesome, AntDesign, Entypo, MaterialCommunityIcons, and more.

---

## Hooks

### useTheme()
Access the current theme values and toggle function.

```tsx
import { useTheme } from 'zero-to-app';

function MyComponent() {
  const { values, mode, toggleTheme, setMode } = useTheme();

  return (
    <View style={{ backgroundColor: values.surface }}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
```

### useBrand()
Access brand configuration values.

```tsx
import { useBrand } from 'zero-to-app';

function MyComponent() {
  const brand = useBrand();

  return (
    <View style={{
      padding: brand.spacing.lg,
      borderRadius: brand.borderRadius
    }}>
      <Text>{brand.name}</Text>
    </View>
  );
}
```

### useDimensions()
Get responsive window dimensions and breakpoint.

```tsx
import { useDimensions, breakpoints } from 'zero-to-app';

function ResponsiveComponent() {
  const { width, height, breakpoint } = useDimensions();
  const isDesktop = width >= breakpoints.large;

  return (
    <View style={{ padding: isDesktop ? 40 : 16 }}>
      {/* Content */}
    </View>
  );
}
```

---

## Development

This repository is a pnpm monorepo containing:

- **`zero-to-app/`** - The publishable component library
- **`apps/storybook/`** - Storybook for isolated component development (web + native)
- **`apps/demo/`** - Demo Expo app for testing integrated components

### Getting Started

```bash
# Install dependencies
pnpm install

# View all available scripts
pnpm help
```

### Development Workflow

#### Storybook (Preferred for Isolated Components)

Use Storybook for developing and testing isolated UI components:

```bash
# Web Storybook (fast iteration)
pnpm dev:storybook:web

# Native Storybook (test on device)
pnpm dev:storybook
pnpm dev:storybook:ios
pnpm dev:storybook:android
```

**When to use Storybook:**
- Developing isolated UI components (Button, Typography, Cards, etc.)
- Testing component variants and states
- Visual regression testing
- Component documentation

**Limitations:**
- expo-router components cannot be easily mocked
- Complex native dependencies (file system, navigation) are difficult to mock
- Don't spend time creating complex mocks for React Native/Storybook interop

#### Demo App (For Integrated Components)

Use the demo app for components that require expo-router, navigation, or other complex dependencies:

```bash
# Start demo app
pnpm dev:demo
pnpm dev:demo:ios
pnpm dev:demo:android
pnpm dev:demo:web
```

**When to use Demo:**
- Testing AppTabs and navigation components
- Components requiring expo-router context
- Integration testing with real navigation
- Testing components with file system or other native dependencies

### Building the Library

```bash
# Build zero-to-app package
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix
```

### Publishing

```bash
# Build and publish to npm
pnpm release
```

---

## Contributing

### Component Development Guidelines

1. **Use Storybook for isolated components** - Develop Button, Typography, Cards, Inputs, etc. in Storybook for fast iteration
2. **Use Demo for integrated components** - Test navigation, routing, and complex dependencies in the demo app
3. **Don't over-mock** - If a dependency is hard to mock (expo-router, file system), use the demo app instead
4. **Follow Material Design 3** - Use M3 tokens and design patterns
5. **TypeScript first** - All components must be fully typed
6. **Accessibility** - Support keyboard navigation, screen readers, and focus states
7. **Document props** - Use JSDoc comments for all public APIs

### Adding New Components

1. Create component in `zero-to-app/components/`
2. Export from appropriate index file
3. Add Storybook story (if component can be isolated)
4. Update TypeScript types
5. Test in demo app if needed
6. Document in README

### Code Style

- Use functional components with hooks
- Prefer named exports for utilities, default exports for components
- Follow existing component structure (imports, types, component, styles, exports)
- Use semantic tokens from theme where possible
- Keep components focused and composable

---

## License

MIT

---

## Links

- **Documentation:** [GitHub Repository](https://github.com/Alex-Amayo/zero-to-app)
- **Live Demo:** [https://zero-to-app.expo.app](https://zero-to-app.expo.app)
- **Issues:** [GitHub Issues](https://github.com/Alex-Amayo/zero-to-app/issues)
- **NPM:** [zero-to-app](https://www.npmjs.com/package/zero-to-app)
