# zero-to-app

A Material Design 3 component library for React Native and Expo, supporting iOS, Android, and Web platforms.

🌐 **Live Demo:** [https://zero-to-app.expo.app](https://zero-to-app.expo.app)

---

## Installation

```bash
npm install zero-to-app
# or
pnpm add zero-to-app
```

### Required Peer Dependencies

```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-screens expo-router @expo/vector-icons
```

### Optional Dependencies

For specific components (blur effects, carousels, animations):

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
      // ... other M3 color tokens (see below)
    },
    fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },
    spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
    borderRadius: 8,
  });

  return (
    <ZeroToApp brand={brand}>
      {/* Your app content */}
    </ZeroToApp>
  );
}
```

**💡 Pro tip:** Use `colorSeed` to auto-generate all M3 tokens from a single color:

```tsx
const brand = createBrand({
  name: 'My App',
  colors: { colorSeed: { primary: '#6750A4' } }, // Generates full palette
  fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: 8,
});
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

## Components

### Button

Material Design 3 button with five variants:

```tsx
<Button title="Primary" variant="filled" onPress={handlePress} />
<Button title="Secondary" variant="tonal" onPress={handlePress} />
<Button title="Tertiary" variant="outlined" onPress={handlePress} />
<Button title="Text" variant="text" onPress={handlePress} />
<Button title="Elevated" variant="elevated" onPress={handlePress} />

// With icon
<Button
  title="Save"
  icon={{ library: 'Feather', name: 'save', size: 20 }}
  iconPosition="left"
  onPress={handleSave}
/>
```

**Key Props:** `title`, `variant`, `onPress`, `loading`, `disabled`, `icon`, `iconPosition`, `size`

### Typography

Type-safe typography with M3 type scale:

```tsx
<Typography variant="displayLarge">Hero Title</Typography>
<Typography variant="headlineMedium" weight="bold">Section</Typography>
<Typography variant="bodyMedium">Body text</Typography>
<Typography variant="labelSmall" muted>Caption</Typography>
```

**Variants:** `display{Large|Medium|Small}`, `headline{Large|Medium|Small}`, `title{Large|Medium|Small}`, `body{Large|Medium|Small}`, `label{Large|Medium|Small}`

### ThemedView

Container with automatic theme-aware styling:

```tsx
<ThemedView variant="surface">
  <Typography>Automatically themed content</Typography>
</ThemedView>
```

**Variants:** `background`, `surface`, `surfaceVariant`, `primary`, `secondary`, `appbar`

### AppTabs

Cross-platform tab navigation (requires expo-router):

```tsx
import { AppTabs } from 'zero-to-app';

export default function TabLayout() {
  return (
    <AppTabs
      brandName="My App"
      tabs={[
        {
          name: 'index',
          href: '/',
          label: 'Home',
          sfSymbol: { default: 'house', selected: 'house.fill' },
          materialIcon: 'home',
        },
      ]}
      externalLinks={[
        { label: 'Docs', href: 'https://docs.example.com', icon: { library: 'Feather', name: 'book-open' } }
      ]}
    />
  );
}
```

**Platform Behavior:**
- **iOS**: NativeTabs with liquid glass effect, SF Symbols
- **Android**: NativeTabs with Material Design icons
- **Web**: Custom app bar with flexible icon libraries + external links

### Sidebar

Responsive sidebar/drawer navigation with automatic desktop/mobile behavior:

```tsx
import { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarFooter, useSidebar } from 'zero-to-app';

function MyScreen() {
  const { open } = useSidebar();

  return (
    <>
      <Sidebar
        header={<SidebarHeader title="My App" />}
        footer={<SidebarFooter>v1.0.0</SidebarFooter>}
      >
        <SidebarSection title="Main">
          <SidebarItem
            icon={{ library: 'Feather', name: 'home' }}
            label="Home"
            active={true}
            onPress={() => console.log('Home')}
          />
        </SidebarSection>
      </Sidebar>

      {/* Mobile: Show menu button to open drawer */}
      <Button title="Menu" onPress={open} />
    </>
  );
}
```

**Platform Behavior:**
- **Desktop (≥1024px)**: Static sidebar always visible, positioned below AppBar
- **Mobile (<1024px)**: Drawer that slides from left with backdrop, auto-closes on item click

**Key Props:**
- `useSidebar()` hook: `{ isOpen, open, close, toggle }`
- Icons are optional on all items

### Screen

Standardized screen wrapper that handles layout, navigation chrome, and safe areas:

```tsx
import { Screen } from 'zero-to-app';

function MyScreen() {
  return (
    <Screen 
      variant="background" 
      scrollable
      centered // Horizontally centers content with max-width (useful for web)
    >
      <Typography>Content automatically handles safe areas and web offsets</Typography>
    </Screen>
  );
}
```

**Features:**
- **Navigation Awareness**: Automatically offsets content for the web `AppBar` using `useLayout()`.
- **Layout Consistency**: `centered` prop handles horizontal centering and max-width uniformly.
- **Native Performance**: Uses `react-native-screens` for truly native screen behavior.
- **Automatic SafeAreas**: Integration with `react-native-safe-area-context`.
- **Scroll Handling**: Optional ScrollView via `scrollable` prop.

---

## Hooks

### useTheme()

Access the current active theme values (colors, spacing, and border radius):

```tsx
import { useTheme } from 'zero-to-app';

function MyComponent() {
  const theme = useTheme();

  return (
    <View style={{ 
      backgroundColor: theme.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius
    }}>
      <Text style={{ color: theme.onSurface }}>Themed Content</Text>
    </View>
  );
}
```

### useThemeMode()

Access theme mode and controllers:

```tsx
import { useThemeMode } from 'zero-to-app';

function ThemeToggler() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Button 
      title={`Switch to ${mode === 'light' ? 'dark' : 'light'}`} 
      onPress={toggleTheme} 
    />
  );
}
```

### useBrandConfig()

Access brand configuration (static values like name, logo):

```tsx
import { useBrandConfig } from 'zero-to-app';

function MyComponent() {
  const brand = useBrandConfig();
  const { values: theme } = useThemeContext();

  return (
    <View style={{
      borderRadius: theme.borderRadius
    }}>
      <Text>{brand.name}</Text>
    </View>
  );
}
```

### useThemeContext()

Access the full theme context (values, mode, and controllers). Recommended for internal use or complex theme logic:

```tsx
import { useThemeContext } from 'zero-to-app';

function MyThemedComponent() {
  const { values: theme, mode, setMode } = useThemeContext();

  return (
    <View style={{ 
      backgroundColor: theme.surface,
      padding: theme.spacing.md 
    }}>
      <Text style={{ color: theme.onSurface }}>Current mode: {mode}</Text>
    </View>
  );
}
```

### useDimensions()

Get responsive window dimensions and breakpoint:

```tsx
import { useDimensions, breakpoints } from 'zero-to-app';

function ResponsiveComponent() {
  const { width, breakpoint } = useDimensions();
  const isDesktop = width >= breakpoints.large;

  return (
    <View style={{ padding: isDesktop ? 40 : 16 }}>
      {/* Content */}
    </View>
  );
}
```

**Breakpoints:** `small` (< 480px), `medium` (≥ 768px), `large` (≥ 1024px), `xlarge` (≥ 1280px)

### useSidebar()

Control sidebar/drawer state from anywhere:

```tsx
import { useSidebar } from 'zero-to-app';

function MyComponent() {
  const { isOpen, open, close, toggle } = useSidebar();

  return (
    <Button title="Toggle Sidebar" onPress={toggle} />
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
    <View style={{ top: appBarHeight }}>
      {/* Content positioned below AppBar */}
    </View>
  );
}
```

---

## Material Design 3 Tokens

### Required Color Tokens

| Token | Purpose | Example |
|-------|---------|---------|
| `primary` | Primary brand color | `#6200EE` |
| `onPrimary` | Text/icons on primary | `#FFFFFF` |
| `primaryContainer` | Container using primary | `#EADDFF` |
| `onPrimaryContainer` | Text on primary container | `#21005E` |
| `secondary` | Secondary brand color | `#03DAC6` |
| `onSecondary` | Text/icons on secondary | `#000000` |
| `tertiary` | Tertiary accent color | `#03A9F4` |
| `error` | Error state color | `#B00020` |
| `surface` | Background surface | `#FFFFFF` |
| `onSurface` | Primary text on surface | `#1C1B1F` |
| `outline` | Border/divider color | `#79747E` |

**+ 20 more tokens** (surface variants, inverse colors, etc.) - see [.claude/skills/zero-to-app-usage.md](./.claude/skills/zero-to-app-usage.md) for complete list

### Semantic Tokens

The library provides component-specific tokens:

```tsx
const theme = useTheme();

theme.tokens.button.filledBg
theme.tokens.input.background
theme.tokens.card.background
theme.tokens.typography.headlineLarge
```

---

## Icons

Icons are powered by `@expo/vector-icons` with platform-specific support:

```tsx
import { renderIcon } from 'zero-to-app/icons';

// Render any icon from supported libraries
renderIcon(
  { library: 'Feather', name: 'home' },
  'Feather',
  24,
  '#000000'
)
```

**Supported Libraries:** Feather, MaterialIcons, Ionicons, FontAwesome, AntDesign, Entypo, MaterialCommunityIcons, and more

📖 **Full icon docs:** See [zero-to-app/icons/README.md](./zero-to-app/icons/README.md)

---

## Development

This is a pnpm monorepo with three main parts:

- **`zero-to-app/`** - The publishable component library
- **`apps/storybook/`** - Storybook for isolated component development
- **`apps/demo/`** - Demo Expo app for integrated testing

### Getting Started

```bash
# Install dependencies
pnpm install

# View available commands
pnpm help
```

### Development Workflow

**Storybook (Preferred for Isolated Components):**

```bash
pnpm dev:storybook:web      # Fast web iteration
pnpm dev:storybook          # Native Expo Storybook
pnpm dev:storybook:ios      # iOS device testing
pnpm dev:storybook:android  # Android device testing
```

Use Storybook for: Button, Typography, Cards, Inputs, and other isolated UI components

**Demo App (For Integrated Components):**

```bash
pnpm dev:demo          # Start Expo dev server
pnpm dev:demo:ios      # iOS simulator
pnpm dev:demo:android  # Android emulator
pnpm dev:demo:web      # Web browser
```

Use Demo for: AppTabs, navigation, expo-router components, complex dependencies

### Building & Publishing

```bash
# Build library
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Publish to npm
pnpm release
```

📖 **Full development guide:** See [.claude/skills/zero-to-app-dev.md](./.claude/skills/zero-to-app-dev.md)

---

## Contributing

### Component Development Guidelines

1. **Use Storybook for isolated components** - Fast iteration for Button, Typography, Cards, etc.
2. **Use Demo for integrated components** - Test navigation and expo-router dependencies
3. **Follow Material Design 3** - Use M3 tokens and design patterns
4. **TypeScript first** - All components must be fully typed with JSDoc
5. **Accessibility** - Support keyboard navigation, screen readers, and WCAG AA contrast

### Adding New Components

1. Create component in `zero-to-app/components/ui/` or `zero-to-app/components/navigation/`
2. Export from appropriate index file
3. Add Storybook story (if component can be isolated)
4. Test in demo app if needed
5. Update documentation

---

## Resources

- **Documentation:** [GitHub Repository](https://github.com/Alex-Amayo/zero-to-app)
- **Live Demo:** [https://zero-to-app.expo.app](https://zero-to-app.expo.app)
- **Material Design 3:** [m3.material.io](https://m3.material.io)
- **NPM Package:** [npmjs.com/package/zero-to-app](https://www.npmjs.com/package/zero-to-app)
- **Issues:** [GitHub Issues](https://github.com/Alex-Amayo/zero-to-app/issues)

---

## License

MIT
