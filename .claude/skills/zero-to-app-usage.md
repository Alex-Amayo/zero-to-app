# zero-to-app Usage Guide

**Context:** You are assisting an end user implementing the `zero-to-app` component library in their React Native or Expo project.

---

## Installation

### Install Package

```bash
npm install zero-to-app
# or
pnpm add zero-to-app
# or
yarn add zero-to-app
```

### Install Peer Dependencies

**Required dependencies:**
```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-screens expo-router
```

**Optional dependencies (for specific components):**
```bash
npx expo install expo-blur expo-glass-effect @shopify/flash-list lottie-react-native react-native-reanimated-carousel
```

---

## Quick Start

### 1. Setup Provider

Wrap your app with the `ZeroToApp` provider in your root layout:

**For Expo Router apps:**
```tsx
// app/_layout.tsx
import { ZeroToApp, createBrand } from 'zero-to-app';

export default function RootLayout() {
  const brand = createBrand({
    name: 'My App',
    colors: {
      primary: '#6200EE',
      onPrimary: '#FFFFFF',
      primaryContainer: '#EADDFF',
      onPrimaryContainer: '#21005E',
      secondary: '#03DAC6',
      onSecondary: '#000000',
      secondaryContainer: '#B2F1E8',
      onSecondaryContainer: '#00201C',
      tertiary: '#03A9F4',
      onTertiary: '#FFFFFF',
      tertiaryContainer: '#B3E5FC',
      onTertiaryContainer: '#001F28',
      error: '#B00020',
      onError: '#FFFFFF',
      errorContainer: '#FDECEA',
      onErrorContainer: '#410002',
      surface: '#FFFFFF',
      onSurface: '#1C1B1F',
      surfaceVariant: '#E7E0EC',
      onSurfaceVariant: '#49454F',
      outline: '#79747E',
      outlineVariant: '#CAC4D0',
      surfaceContainer: '#F3EDF7',
      surfaceContainerHigh: '#ECE6F0',
      surfaceContainerHighest: '#E6E0E9',
      surfaceContainerLow: '#F7F2FA',
      surfaceContainerLowest: '#FFFFFF',
      inverseSurface: '#313033',
      inverseOnSurface: '#F4EFF4',
      inversePrimary: '#D0BCFF',
      scrim: '#000000',
      shadow: '#000000',
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
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ZeroToApp>
  );
}
```

**For standard React Native apps:**
```tsx
// App.tsx
import { ZeroToApp, createBrand } from 'zero-to-app';
import { NavigationContainer } from '@react-navigation/native';

const brand = createBrand({
  // ... brand configuration
});

export default function App() {
  return (
    <ZeroToApp brand={brand}>
      <NavigationContainer>
        {/* Your navigation */}
      </NavigationContainer>
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

## Brand Configuration

### Creating a Brand

The `createBrand()` function accepts a configuration object with all Material Design 3 color tokens:

```tsx
import { createBrand } from 'zero-to-app';

const myBrand = createBrand({
  name: 'My App',
  colors: {
    // Required M3 color tokens (see full list below)
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
  logo: {
    light: require('./assets/logo-light.png'),
    dark: require('./assets/logo-dark.png'),
  },
  navigation: {
    items: [
      {
        route: '/(tabs)/home',
        title: 'Home',
        icon: {
          web: { library: 'Feather', name: 'home' },
          mobile: 'house', // SF Symbol on iOS
        },
      },
    ],
  },
  footerLinks: {
    links: [
      { text: 'Privacy', route: '/privacy' },
      { text: 'Terms', route: '/terms' },
    ],
  },
});
```

### Required M3 Color Tokens

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
| `surfaceContainer` | Base container | `#F3EDF7` |
| `surfaceContainerLow` | Low elevation | `#F7F2FA` |
| `surfaceContainerLowest` | Lowest elevation | `#FFFFFF` |
| `surfaceContainerHigh` | High elevation | `#ECE6F0` |
| `surfaceContainerHighest` | Highest elevation | `#E6E0E9` |
| `inverseSurface` | Inverse surface (tooltips) | `#313033` |
| `inverseOnSurface` | Text on inverse surface | `#F4EFF4` |
| `inversePrimary` | Primary color on inverse | `#D0BCFF` |
| `scrim` | Overlay scrim | `#000000` |
| `shadow` | Shadow color | `#000000` |

### Automatic Palette Generation

Instead of manually specifying all tokens, you can generate a complete M3 palette from a seed color:

```tsx
import { createBrand } from 'zero-to-app';

const brand = createBrand({
  name: 'My App',
  colors: {
    colorSeed: { primary: '#6750A4' }, // Generates all M3 tokens
  },
  fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: 8,
});
```

This automatically generates light and dark theme colors using Material Design 3 algorithms.

### Accessing Brand Values

Use the `useBrand()` hook to access brand configuration in components:

```tsx
import { useBrand } from 'zero-to-app';

function MyComponent() {
  const brand = useBrand();

  return (
    <View style={{
      padding: brand.spacing.lg,
      borderRadius: brand.borderRadius,
    }}>
      <Text style={{ fontSize: brand.fontSizes.large }}>
        {brand.name}
      </Text>
    </View>
  );
}
```

---

## Components

### Button

Material Design 3 button with five variants.

```tsx
import { Button } from 'zero-to-app';

function MyScreen() {
  return (
    <>
      <Button title="Primary Action" variant="filled" onPress={handlePress} />
      <Button title="Secondary" variant="tonal" onPress={handlePress} />
      <Button title="Cancel" variant="outlined" onPress={handlePress} />
      <Button title="Learn More" variant="text" onPress={handlePress} />
      <Button title="Floating" variant="elevated" onPress={handlePress} />
    </>
  );
}
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Button text |
| `variant` | `'filled' \| 'elevated' \| 'tonal' \| 'outlined' \| 'text'` | `'filled'` | Visual style |
| `onPress` | `() => void` | - | Press handler |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable interaction |
| `icon` | `IconConfig` | - | Optional icon |
| `iconPosition` | `'left' \| 'right'` | `'right'` | Icon position |
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | `'s'` | Button size |

**With Icon:**
```tsx
<Button
  title="Save"
  icon={{ library: 'Feather', name: 'save', size: 20 }}
  iconPosition="left"
  onPress={handleSave}
/>
```

### Typography

Type-safe typography component with M3 type scale.

```tsx
import { Typography } from 'zero-to-app';

function MyScreen() {
  return (
    <>
      <Typography variant="displayLarge">Hero Title</Typography>
      <Typography variant="headlineMedium" weight="bold">Section Header</Typography>
      <Typography variant="bodyMedium">Body text content here.</Typography>
      <Typography variant="labelSmall" muted>Caption text</Typography>
    </>
  );
}
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `TypographyVariant` | `'bodyMedium'` | M3 type scale |
| `weight` | `'light' \| 'regular' \| 'medium' \| 'bold'` | `'regular'` | Font weight |
| `color` | `string` | theme color | Text color |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `muted` | `boolean` | `false` | Use muted color |
| `uppercase` | `boolean` | `false` | Transform to uppercase |
| `numberOfLines` | `number` | - | Limit lines |

**Variants:**
- **Display:** `displayLarge`, `displayMedium`, `displaySmall` (57-36px)
- **Headline:** `headlineLarge`, `headlineMedium`, `headlineSmall` (32-24px)
- **Title:** `titleLarge`, `titleMedium`, `titleSmall` (22-14px)
- **Body:** `bodyLarge`, `bodyMedium`, `bodySmall` (16-12px)
- **Label:** `labelLarge`, `labelMedium`, `labelSmall` (14-11px)

### ThemedView

Container component with automatic theme-aware styling.

```tsx
import { ThemedView } from 'zero-to-app';

function MyScreen() {
  return (
    <ThemedView variant="surface">
      <Typography>Content automatically themed</Typography>
    </ThemedView>
  );
}
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'background' \| 'surface' \| 'surfaceVariant' \| 'primary' \| 'secondary'` | `'background'` | Surface type |
| `style` | `ViewStyle` | - | Additional styles |

### AppTabs (Navigation)

Native tab navigation for iOS and Android (requires expo-router).

```tsx
import { AppTabs } from 'zero-to-app';

// Configure via brand navigation items
const brand = createBrand({
  // ...
  navigation: {
    items: [
      {
        route: '/(tabs)/home',
        title: 'Home',
        icon: {
          web: { library: 'Feather', name: 'home' },
          mobile: 'house', // SF Symbol for iOS
        },
      },
      {
        route: '/(tabs)/profile',
        title: 'Profile',
        icon: {
          web: { library: 'Feather', name: 'user' },
          mobile: 'person',
        },
      },
    ],
  },
});

// Use in your tab layout
export default function TabLayout() {
  return <AppTabs />;
}
```

---

## Hooks

### useTheme()

Access theme values and toggle between light/dark mode.

```tsx
import { useTheme } from 'zero-to-app';

function MyComponent() {
  const { values, mode, toggleTheme, setMode } = useTheme();

  return (
    <View style={{ backgroundColor: values.surface }}>
      <Text style={{ color: values.onSurface }}>
        Current mode: {mode}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
```

**Returns:**
- `values: ThemeValuesType` - Current theme tokens
- `mode: 'light' | 'dark'` - Current theme mode
- `toggleTheme: () => void` - Toggle between light/dark
- `setMode: (mode: 'light' | 'dark') => void` - Set specific mode

### useBrand()

Access brand configuration values.

```tsx
import { useBrand } from 'zero-to-app';

function MyComponent() {
  const brand = useBrand();

  return (
    <View style={{
      padding: brand.spacing.lg,
      borderRadius: brand.borderRadius,
    }}>
      <Text style={{ fontSize: brand.fontSizes.large }}>
        {brand.name}
      </Text>
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
    <View style={{
      padding: isDesktop ? 40 : 16,
      flexDirection: isDesktop ? 'row' : 'column',
    }}>
      <Text>Width: {width}px</Text>
    </View>
  );
}
```

**Breakpoints:**
- `small`: < 480px (mobile)
- `medium`: ≥ 768px (tablet)
- `large`: ≥ 1024px (desktop)
- `xlarge`: ≥ 1280px (large desktop)

---

## Common Patterns

### Theme-Aware Styling

```tsx
import { useTheme } from 'zero-to-app';

function ThemedCard() {
  const { values: theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.tokens.card.background,
        borderColor: theme.outlineVariant,
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
      }}
    >
      <Text style={{ color: theme.tokens.card.text }}>
        Automatically adapts to light/dark mode
      </Text>
    </View>
  );
}
```

### Responsive Layout

```tsx
import { useDimensions, breakpoints, useBrand } from 'zero-to-app';

function ResponsiveGrid() {
  const { width } = useDimensions();
  const brand = useBrand();
  const isDesktop = width >= breakpoints.large;

  return (
    <View style={{
      flexDirection: isDesktop ? 'row' : 'column',
      gap: brand.spacing.lg,
      padding: isDesktop ? brand.spacing.xxxl : brand.spacing.xl,
    }}>
      <View style={{ flex: isDesktop ? 1 : undefined }}>
        <Typography>Column 1</Typography>
      </View>
      <View style={{ flex: isDesktop ? 1 : undefined }}>
        <Typography>Column 2</Typography>
      </View>
    </View>
  );
}
```

### Custom Themed Component

```tsx
import { useTheme, useBrand } from 'zero-to-app';

function CustomCard({ children }: { children: React.ReactNode }) {
  const { values: theme } = useTheme();
  const brand = useBrand();

  return (
    <View
      style={{
        backgroundColor: theme.tokens.card.background,
        borderColor: theme.outline,
        borderWidth: 1,
        borderRadius: brand.borderRadius,
        padding: brand.spacing.lg,
        shadowColor: theme.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {children}
    </View>
  );
}
```

### Button Variations

```tsx
import { Button } from 'zero-to-app';

function ButtonExamples() {
  return (
    <>
      {/* Primary action */}
      <Button title="Submit" variant="filled" onPress={handleSubmit} />

      {/* Secondary action */}
      <Button title="Save Draft" variant="tonal" onPress={handleDraft} />

      {/* Tertiary action */}
      <Button title="Cancel" variant="outlined" onPress={handleCancel} />

      {/* Low emphasis */}
      <Button title="Learn More" variant="text" onPress={handleLearn} />

      {/* With icon */}
      <Button
        title="Upload"
        variant="filled"
        icon={{ library: 'Feather', name: 'upload', size: 18 }}
        iconPosition="left"
        onPress={handleUpload}
      />

      {/* Loading state */}
      <Button title="Submitting..." variant="filled" loading={true} />

      {/* Disabled */}
      <Button title="Submit" variant="filled" disabled={true} />
    </>
  );
}
```

---

## Semantic Tokens

The library provides semantic tokens for component styling:

```tsx
import { useTheme } from 'zero-to-app';

function MyComponent() {
  const { values: theme } = useTheme();

  // Button tokens
  theme.tokens.button.filledBg;
  theme.tokens.button.filledText;
  theme.tokens.button.outlinedBorder;

  // Input tokens
  theme.tokens.input.background;
  theme.tokens.input.border;
  theme.tokens.input.placeholder;

  // Typography tokens
  theme.tokens.typography.headlineLarge;
  theme.tokens.typography.bodyMedium;

  // Card tokens
  theme.tokens.card.background;
  theme.tokens.card.text;

  // Use in styles
  return (
    <View style={{ backgroundColor: theme.tokens.card.background }}>
      <Text style={{ color: theme.tokens.card.text }}>Card</Text>
    </View>
  );
}
```

---

## Troubleshooting

### Provider Not Wrapped

**Error:** `useBrand must be used within BrandProvider`

**Solution:** Ensure `<ZeroToApp>` wraps your app in the root layout:
```tsx
// app/_layout.tsx
import { ZeroToApp, createBrand } from 'zero-to-app';

export default function RootLayout() {
  const brand = createBrand({ /* ... */ });

  return (
    <ZeroToApp brand={brand}>
      {/* Your app */}
    </ZeroToApp>
  );
}
```

### Missing Peer Dependencies

**Error:** Module not found: expo-router, react-native-reanimated, etc.

**Solution:** Install peer dependencies:
```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-screens expo-router
```

### TypeScript Errors

**Error:** Property 'colors' does not exist on type 'Brand'

**Solution:** Ensure you're importing types correctly:
```tsx
import { createBrand, type Brand } from 'zero-to-app';
```

### Theme Not Updating

**Issue:** Components don't reflect light/dark mode changes

**Solution:** Ensure components use `useTheme()` hook:
```tsx
function MyComponent() {
  const { values: theme } = useTheme(); // ✅ Reactive to theme changes

  // ❌ Don't destructure at top level
  // const { surface } = useTheme().values;

  return <View style={{ backgroundColor: theme.surface }} />;
}
```

### Icons Not Displaying

**Issue:** Icons show as empty boxes or missing

**Solution:** Ensure icon library is installed:
```bash
npx expo install @expo/vector-icons
```

And use correct icon names:
```tsx
<Button
  title="Home"
  icon={{ library: 'Feather', name: 'home' }} // ✅ Correct
  // icon={{ name: 'invalid-icon' }} // ❌ Wrong
/>
```

---

## Best Practices

### Theme Usage

✅ **Do:**
- Use semantic tokens (`theme.tokens.button.filledBg`)
- Use `useTheme()` in functional components
- Keep styles reactive to theme changes

❌ **Don't:**
- Hardcode colors (`#FFFFFF`)
- Destructure theme values at module level
- Mix light/dark specific logic manually

### Brand Configuration

✅ **Do:**
- Create brand once at app root
- Use `colorSeed` for automatic M3 palette
- Store brand config in separate file

❌ **Don't:**
- Create brand inside components
- Modify brand at runtime
- Mix multiple brands in one app

### Component Composition

✅ **Do:**
- Compose with library components
- Use `useBrand()` for spacing/sizing
- Leverage responsive hooks

❌ **Don't:**
- Recreate library components
- Use fixed pixel values
- Ignore breakpoints for responsive design

---

## Resources

- **Documentation:** [GitHub Repository](https://github.com/Alex-Amayo/zero-to-app)
- **Live Demo:** [https://zero-to-app.expo.app](https://zero-to-app.expo.app)
- **Material Design 3:** [m3.material.io](https://m3.material.io)
- **Issues:** [GitHub Issues](https://github.com/Alex-Amayo/zero-to-app/issues)
- **NPM Package:** [npmjs.com/package/zero-to-app](https://www.npmjs.com/package/zero-to-app)
