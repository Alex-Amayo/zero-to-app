# zero-to-app Usage Guide

**Context:** You are assisting an end user implementing the `zero-to-app` component library in their React Native or Expo project.

**📖 For basic usage, see the [main README](../../../README.md).** This guide covers advanced topics, edge cases, and troubleshooting.

---

## Advanced Brand Configuration

### Custom Dark Mode Colors

Override specific dark mode colors while using colorSeed:

```tsx
const brand = createBrand({
  name: 'My App',
  colors: {
    colorSeed: { primary: '#6750A4' }, // Auto-generates light colors
  },
  darkColors: {
    // Override specific dark mode tokens
    surface: '#1C1B1F',
    onSurface: '#E6E1E5',
    primary: '#D0BCFF',
    // Other tokens auto-generated from seed
  },
  fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: 8,
});
```

### Navigation Configuration

Configure tabs and external links in brand:

```tsx
const brand = createBrand({
  name: 'My App',
  // ... colors, fontSizes, spacing, borderRadius
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
  footerLinks: {
    links: [
      { text: 'Privacy Policy', route: '/privacy' },
      { text: 'Terms of Service', route: '/terms' },
      { text: 'Help', route: '/help' },
    ],
  },
  logo: {
    light: require('./assets/logo-light.png'),
    dark: require('./assets/logo-dark.png'),
  },
});
```

### Full M3 Color Token Reference

When manually specifying all tokens (instead of using `colorSeed`):

```tsx
colors: {
  // Primary
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005E',

  // Secondary
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1E192B',

  // Tertiary
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#370B1E',

  // Error
  error: '#B3261E',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',

  // Surface
  surface: '#FFFBFE',
  onSurface: '#1C1B1F',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',

  // Surface Containers (elevation levels)
  surfaceContainer: '#F3EDF7',
  surfaceContainerLow: '#F7F2FA',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerHigh: '#ECE6F0',
  surfaceContainerHighest: '#E6E0E9',

  // Outline
  outline: '#79747E',
  outlineVariant: '#CAC4D0',

  // Inverse (for tooltips, snackbars)
  inverseSurface: '#313033',
  inverseOnSurface: '#F4EFF4',
  inversePrimary: '#D0BCFF',

  // System
  scrim: '#000000',
  shadow: '#000000',
}
```

---

## Component Advanced Usage

### Button

#### Loading States

```tsx
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await api.submit(data);
  } finally {
    setLoading(false);
  }
};

<Button
  title={loading ? 'Submitting...' : 'Submit'}
  variant="filled"
  loading={loading}
  disabled={loading}
  onPress={handleSubmit}
/>
```

#### Icon Variants

```tsx
// Different icon libraries
<Button
  title="Feather Icon"
  icon={{ library: 'Feather', name: 'home', size: 20 }}
/>

<Button
  title="Material Icon"
  icon={{ library: 'MaterialIcons', name: 'home', size: 20 }}
/>

<Button
  title="FontAwesome Icon"
  icon={{ library: 'FontAwesome', name: 'home', size: 20 }}
/>

// Icon on left or right
<Button
  title="Upload"
  icon={{ library: 'Feather', name: 'upload', size: 18 }}
  iconPosition="left"  // or "right" (default)
/>
```

#### Size Variants

```tsx
<Button title="Extra Small" size="xs" />
<Button title="Small" size="s" />  {/* default */}
<Button title="Medium" size="m" />
<Button title="Large" size="l" />
<Button title="Extra Large" size="xl" />
```

### Typography

#### Weight and Styling

```tsx
<Typography variant="bodyLarge" weight="light">Light text</Typography>
<Typography variant="bodyLarge" weight="regular">Regular text</Typography>
<Typography variant="bodyLarge" weight="medium">Medium text</Typography>
<Typography variant="bodyLarge" weight="bold">Bold text</Typography>

<Typography variant="labelMedium" uppercase>UPPERCASE LABEL</Typography>
<Typography variant="bodyMedium" muted>Muted text (uses onSurfaceVariant)</Typography>
```

#### Text Alignment and Truncation

```tsx
<Typography variant="headlineMedium" align="center">
  Centered headline
</Typography>

<Typography variant="bodyMedium" numberOfLines={2}>
  Long text that will be truncated after two lines with an ellipsis...
</Typography>
```

#### Custom Colors

```tsx
const { values: theme } = useTheme();

<Typography variant="bodyMedium" color={theme.primary}>
  Primary colored text
</Typography>

<Typography variant="bodyMedium" color={theme.error}>
  Error colored text
</Typography>

<Typography variant="bodyMedium" color="#FF0000">
  Custom hex color (avoid if possible - use theme tokens)
</Typography>
```

### ThemedView

#### Variant Examples

```tsx
// App background
<ThemedView variant="background" style={{ flex: 1 }}>
  {/* Full screen content */}
</ThemedView>

// Card surface
<ThemedView variant="surface" style={{ padding: 16, borderRadius: 12 }}>
  <Typography>Card content</Typography>
</ThemedView>

// Subtle surface variant
<ThemedView variant="surfaceVariant" style={{ padding: 16 }}>
  <Typography>Subtle background</Typography>
</ThemedView>

// Primary colored section
<ThemedView variant="primary" style={{ padding: 24 }}>
  <Typography color="#FFFFFF">Content on primary color</Typography>
</ThemedView>

// App bar
<ThemedView variant="appbar" style={{ padding: 16 }}>
  <Typography weight="medium">App Bar Title</Typography>
</ThemedView>
```

### AppTabs

#### Complete Configuration

```tsx
import { Platform } from 'react-native';

<AppTabs
  brandName="My App"
  tabs={[
    {
      name: 'index',
      href: '/',
      label: 'Home',
      sfSymbol: { default: 'house', selected: 'house.fill' }, // Optional
      materialIcon: 'home', // Optional
      webIcon: { library: 'Feather', name: 'home' }, // Optional web override
    },
    {
      name: 'explore',
      href: '/explore',
      label: 'Explore',
      sfSymbol: { default: 'safari', selected: 'safari.fill' },
      materialIcon: 'explore',
      // No webIcon - will use materialIcon on web
    },
    {
      name: 'profile',
      href: '/profile',
      label: 'Profile',
      // Icons are optional - can have tabs without icons
    },
  ]}
  {...(Platform.OS === 'web' && {
    externalLinks: [
      { label: 'Docs', href: 'https://docs.myapp.com', icon: { library: 'Feather', name: 'book-open' } },
      { label: 'Support', href: 'https://support.myapp.com', icon: { library: 'Feather', name: 'help-circle' } },
    ]
  })}
/>
```

**Important:** Icons (`sfSymbol`, `materialIcon`, `webIcon`) are all optional. External links are **web-only** and should be conditionally passed.

#### Platform-Specific Behaviors

**iOS:**
- Uses `NativeTabs` from expo-router/unstable-native-tabs
- Liquid glass effect (iOS 26+)
- SF Symbols icons (optional)
- Bottom tabs with native animations
- External links **not supported**

**Android:**
- Uses `NativeTabs` from expo-router/unstable-native-tabs
- Material Design 3 navigation bar
- Material icons (optional)
- Bottom tabs with native animations
- External links **not supported**

**Web:**
- Custom app bar at top (horizontal layout)
- Uses `webIcon` if provided, otherwise `materialIcon` (all optional)
- Supports any icon library from @expo/vector-icons
- Responsive breakpoints
- External links displayed in app bar with optional icons

---

## Hooks Advanced Usage

### useTheme()

#### Programmatic Theme Control

```tsx
function ThemeSettings() {
  const { mode, setMode, toggleTheme } = useTheme();

  return (
    <View>
      <Typography>Current theme: {mode}</Typography>
      <Button title="Light Mode" onPress={() => setMode('light')} />
      <Button title="Dark Mode" onPress={() => setMode('dark')} />
      <Button title="Toggle" onPress={toggleTheme} />
    </View>
  );
}
```

#### Accessing Semantic Tokens

```tsx
function CustomComponent() {
  const { values: theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.tokens.card.background,
        borderColor: theme.tokens.card.border,
        borderWidth: 1,
      }}
    >
      <Text style={{ color: theme.tokens.card.text }}>
        Uses semantic tokens
      </Text>
    </View>
  );
}
```

#### Available Semantic Tokens

```tsx
const { values: theme } = useTheme();

// Button tokens
theme.tokens.button.filledBg
theme.tokens.button.filledText
theme.tokens.button.tonalBg
theme.tokens.button.tonalText
theme.tokens.button.outlinedBorder
theme.tokens.button.outlinedText
theme.tokens.button.textText
theme.tokens.button.elevatedBg
theme.tokens.button.elevatedText

// Input tokens
theme.tokens.input.background
theme.tokens.input.border
theme.tokens.input.text
theme.tokens.input.placeholder

// Card tokens
theme.tokens.card.background
theme.tokens.card.text
theme.tokens.card.border

// Typography tokens
theme.tokens.typography.displayLarge
theme.tokens.typography.headlineMedium
theme.tokens.typography.bodyMedium
theme.tokens.typography.labelSmall
// ... all M3 type scale variants

// AppBar tokens
theme.tokens.appbar.background
theme.tokens.appbar.text

// Sidebar tokens
theme.tokens.sidebar.background
theme.tokens.sidebar.itemText
theme.tokens.sidebar.itemActiveText
theme.tokens.sidebar.itemActiveBg
theme.tokens.sidebar.itemHoverBg
theme.tokens.sidebar.divider
theme.tokens.sidebar.width
```

### useDimensions()

#### Responsive Layouts

```tsx
import { useDimensions, breakpoints } from 'zero-to-app';

function ResponsiveGrid() {
  const { width, breakpoint } = useDimensions();

  const columns = breakpoint === 'small' ? 1 : breakpoint === 'medium' ? 2 : 3;
  const isDesktop = width >= breakpoints.large;

  return (
    <View
      style={{
        flexDirection: isDesktop ? 'row' : 'column',
        gap: isDesktop ? 24 : 16,
      }}
    >
      {items.map((item, index) => (
        <View
          key={index}
          style={{
            flex: isDesktop ? 1 / columns : undefined,
            width: isDesktop ? undefined : '100%',
          }}
        >
          {item}
        </View>
      ))}
    </View>
  );
}
```

#### Conditional Rendering Based on Size

```tsx
function ResponsiveNav() {
  const { breakpoint } = useDimensions();
  const isMobile = breakpoint === 'small';

  return (
    <>
      {isMobile ? (
        <MobileNav />  // Hamburger menu
      ) : (
        <DesktopNav />  // Full horizontal nav
      )}
    </>
  );
}
```

### useBrand()

#### Dynamic Spacing

```tsx
function DynamicCard() {
  const brand = useBrand();
  const { breakpoint } = useDimensions();

  const padding = breakpoint === 'small'
    ? brand.spacing.md
    : breakpoint === 'medium'
    ? brand.spacing.lg
    : brand.spacing.xl;

  return (
    <View
      style={{
        padding,
        borderRadius: brand.borderRadius,
      }}
    >
      <Typography>Responsive padding</Typography>
    </View>
  );
}
```

### useSidebar()

Control sidebar/drawer state globally:

```tsx
import { useSidebar } from 'zero-to-app';

function MyComponent() {
  const { isOpen, open, close, toggle } = useSidebar();

  return (
    <>
      <Button title="Open Sidebar" onPress={open} />
      <Button title="Close Sidebar" onPress={close} />
      <Button title="Toggle Sidebar" onPress={toggle} />
      <Typography>Sidebar is {isOpen ? 'open' : 'closed'}</Typography>
    </>
  );
}
```

### useLayout()

Access shared layout information like AppBar height:

```tsx
import { useLayout } from 'zero-to-app';

function MyComponent() {
  const { appBarHeight, setAppBarHeight } = useLayout();

  return (
    <View style={{ top: appBarHeight, position: 'absolute' }}>
      {/* Content positioned below AppBar */}
    </View>
  );
}
```

---

## Common Patterns

### Sidebar Navigation Pattern

Complete sidebar implementation with responsive behavior:

```tsx
import {
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  useSidebar,
  useDimensions,
  breakpoints,
  Button,
  ThemedView,
} from 'zero-to-app';

function MyScreen() {
  const { open } = useSidebar();
  const { width } = useDimensions();
  const isDesktop = width >= breakpoints.large;
  const [selectedItem, setSelectedItem] = useState('home');

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Sidebar
        header={<SidebarHeader title="My App" subtitle="v1.0.0" />}
        footer={
          <SidebarFooter>
            <Typography variant="labelSmall" muted>© 2024 My App</Typography>
          </SidebarFooter>
        }
      >
        <SidebarSection title="Main">
          <SidebarItem
            icon={{ library: 'Feather', name: 'home' }}
            label="Home"
            active={selectedItem === 'home'}
            onPress={() => setSelectedItem('home')}
          />
          <SidebarItem
            icon={{ library: 'Feather', name: 'search' }}
            label="Explore"
            active={selectedItem === 'explore'}
            onPress={() => setSelectedItem('explore')}
          />
        </SidebarSection>

        <SidebarSection title="Account">
          <SidebarItem
            icon={{ library: 'Feather', name: 'user' }}
            label="Profile"
            active={selectedItem === 'profile'}
            onPress={() => setSelectedItem('profile')}
          />
          <SidebarItem
            icon={{ library: 'Feather', name: 'settings' }}
            label="Settings"
            active={selectedItem === 'settings'}
            onPress={() => setSelectedItem('settings')}
          />
        </SidebarSection>
      </Sidebar>

      {/* Main content */}
      <ThemedView
        variant="background"
        style={{
          flex: 1,
          marginLeft: isDesktop ? 280 : 0, // Sidebar width on desktop
        }}
      >
        {/* Mobile: Show menu button */}
        {!isDesktop && (
          <Button
            title="Menu"
            icon={{ library: 'Feather', name: 'menu' }}
            variant="text"
            onPress={open}
          />
        )}

        {/* Your screen content */}
      </ThemedView>
    </View>
  );
}
```

**Behavior:**
- **Desktop (≥1024px)**: Static sidebar always visible on left
- **Mobile (<1024px)**: Drawer slides from left, auto-closes on item click

### Screen Component Pattern

Using Screen for native screen behavior with safe areas:

```tsx
import { Screen, Typography, Button } from 'zero-to-app';

function MyScreen() {
  return (
    <Screen variant="background" scrollable edges={['top', 'bottom']}>
      <Typography variant="headlineLarge">Welcome</Typography>
      <Typography variant="bodyMedium">
        Content automatically handles safe areas on notched devices
      </Typography>
      <Button title="Get Started" variant="filled" onPress={handleStart} />
    </Screen>
  );
}
```

**Props:**
- `variant`: Theme variant (background, surface, etc.)
- `scrollable`: Wraps content in ScrollView
- `edges`: Which safe area edges to respect (['top', 'bottom', 'left', 'right'])
- `contentContainerStyle`: Styles for ScrollView content (when scrollable)

### Theme-Aware Custom Component

```tsx
import { useTheme, useBrand } from 'zero-to-app';

function CustomCard({ title, children }: { title: string; children: React.ReactNode }) {
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
      <Typography variant="titleMedium" weight="medium">
        {title}
      </Typography>
      <View style={{ marginTop: brand.spacing.sm }}>
        {children}
      </View>
    </View>
  );
}
```

### Fully Responsive Component

```tsx
import { useDimensions, breakpoints, useBrand, useTheme } from 'zero-to-app';

function ResponsiveHero() {
  const { width, breakpoint } = useDimensions();
  const brand = useBrand();
  const { values: theme } = useTheme();

  const isDesktop = width >= breakpoints.large;
  const isMobile = breakpoint === 'small';

  return (
    <View
      style={{
        flexDirection: isDesktop ? 'row' : 'column',
        padding: isDesktop ? brand.spacing.xxxl : brand.spacing.xl,
        gap: brand.spacing.xl,
        backgroundColor: theme.surfaceContainer,
      }}
    >
      <View style={{ flex: isDesktop ? 1 : undefined }}>
        <Typography variant={isMobile ? 'headlineMedium' : 'displayLarge'}>
          Welcome
        </Typography>
        <Typography variant="bodyLarge" muted>
          Build amazing apps with zero-to-app
        </Typography>
      </View>

      {!isMobile && (
        <View style={{ flex: isDesktop ? 1 : undefined }}>
          {/* Hero image or content */}
        </View>
      )}
    </View>
  );
}
```

---

## Troubleshooting

### Provider Not Wrapped

**Error:** `useBrand must be used within BrandProvider`

**Solution:** Ensure `<ZeroToApp>` wraps your entire app in the root layout:

```tsx
// app/_layout.tsx
import { ZeroToApp, createBrand } from 'zero-to-app';

export default function RootLayout() {
  const brand = createBrand({ /* ... */ });

  return (
    <ZeroToApp brand={brand}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ZeroToApp>
  );
}
```

### Missing Peer Dependencies

**Error:** `Module not found: expo-router` or similar

**Solution:** Install all required peer dependencies:

```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-screens expo-router @expo/vector-icons
```

### Theme Not Updating

**Issue:** Components don't reflect light/dark mode changes

**Solution:** Ensure components use `useTheme()` hook reactively:

```tsx
// ✅ Correct - reactive to theme changes
function MyComponent() {
  const { values: theme } = useTheme();
  return <View style={{ backgroundColor: theme.surface }} />;
}

// ❌ Wrong - destructured at top level, won't update
const { values: theme } = useTheme();
function MyComponent() {
  return <View style={{ backgroundColor: theme.surface }} />;
}
```

### Icons Not Displaying

**Issue:** Icons show as empty boxes

**Solution 1:** Ensure `@expo/vector-icons` is installed:
```bash
npx expo install @expo/vector-icons
```

**Solution 2:** Check icon name is valid for the library:
- Browse available icons: [icons.expo.fyi](https://icons.expo.fyi)
- SF Symbols: [developer.apple.com/sf-symbols](https://developer.apple.com/sf-symbols/)

**Solution 3:** Verify icon library name matches @expo/vector-icons naming:
```tsx
// ✅ Correct
icon={{ library: 'Feather', name: 'home' }}

// ❌ Wrong - library name typo
icon={{ library: 'feather', name: 'home' }}
```

### TypeScript Errors

**Issue:** Type errors with component props

**Solution:** Import types correctly:

```tsx
import { createBrand, type Brand } from 'zero-to-app';
import type { ButtonProps } from 'zero-to-app';
```

**Issue:** `Property 'tokens' does not exist on type 'ThemeValuesType'`

**Solution:** Ensure you've built the library:
```bash
cd zero-to-app
pnpm build
```

### AppTabs Not Working

**Issue:** AppTabs doesn't render or crashes

**Solution 1:** Ensure expo-router is installed and configured:
```bash
npx expo install expo-router
```

**Solution 2:** Check that tabs are inside expo-router layout:
```tsx
// app/(tabs)/_layout.tsx
import { AppTabs } from 'zero-to-app';

export default function TabLayout() {
  return <AppTabs tabs={[...]} />;
}
```

**Solution 3:** Verify tab route names match file structure:
```
app/(tabs)/
├── _layout.tsx  # Contains <AppTabs />
├── index.tsx    # Tab with name="index"
└── profile.tsx  # Tab with name="profile"
```

### Platform-Specific Issues

**Issue:** Different behavior on iOS vs Android vs Web

**Solution:** Use Platform-specific checks:

```tsx
import { Platform } from 'react-native';

function MyComponent() {
  return (
    <View
      style={{
        ...Platform.select({
          ios: { paddingTop: 20 },
          android: { elevation: 4 },
          web: { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
        }),
      }}
    >
      {/* Content */}
    </View>
  );
}
```

---

## Best Practices

### Theme Usage

✅ **Do:**
- Use semantic tokens: `theme.tokens.button.filledBg`
- Use `useTheme()` inside functional components
- Keep styles reactive to theme changes

❌ **Don't:**
- Hardcode colors: `backgroundColor: '#FFFFFF'`
- Destructure theme values at module level
- Mix light/dark specific logic manually

### Brand Configuration

✅ **Do:**
- Create brand once at app root
- Use `colorSeed` for automatic palette generation
- Store brand config in separate file for reusability

❌ **Don't:**
- Create multiple brands in one app
- Modify brand object at runtime
- Recreate brand on every render

### Component Composition

✅ **Do:**
- Compose with library components
- Use `useBrand()` for consistent spacing/sizing
- Leverage responsive hooks for layouts

❌ **Don't:**
- Recreate library components from scratch
- Use fixed pixel values instead of brand tokens
- Ignore breakpoints for responsive design

### Icon Usage

✅ **Do:**
- Use consistent icon library across app
- Provide explicit library names
- Use SF Symbols for iOS native components
- Set appropriate sizes (16-32px)

❌ **Don't:**
- Mix multiple icon libraries unnecessarily
- Use invalid icon names
- Forget to install @expo/vector-icons
- Hardcode icon colors (use theme)

---

## Resources

- **Main README:** [../../../README.md](../../../README.md)
- **Development Guide:** [./zero-to-app-dev.md](./zero-to-app-dev.md)
- **Live Demo:** [https://zero-to-app.expo.app](https://zero-to-app.expo.app)
- **Material Design 3:** [m3.material.io](https://m3.material.io)
- **Icon Browser:** [icons.expo.fyi](https://icons.expo.fyi)
- **SF Symbols:** [developer.apple.com/sf-symbols](https://developer.apple.com/sf-symbols/)
