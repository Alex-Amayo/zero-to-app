# zero-to-app

Material Design 3 component library for React Native and Expo. Supports iOS, Android, and Web.

🌐 **[Live Demo](https://zero-to-app.expo.app)**

---

## Installation

```bash
npm install zero-to-app

# Required peer dependencies
npx expo install react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-screens expo-router @expo/vector-icons
```

---

## Quick Start

### 1. Setup Provider

```tsx
// app/_layout.tsx
import { ZeroToApp, createBrand } from 'zero-to-app';

const brand = createBrand({
  name: 'My App',
  colors: { colorSeed: { primary: '#6750A4' } }, // Auto-generates M3 palette
  fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: 8,
});

export default function RootLayout() {
  return <ZeroToApp brand={brand}>{/* Your app */}</ZeroToApp>;
}
```

### 2. Use Components

```tsx
import { Button, Typography, ThemedView } from 'zero-to-app';

function MyScreen() {
  return (
    <ThemedView variant="surface">
      <Typography variant="headlineMedium">Welcome</Typography>
      <Button title="Get Started" variant="filled" onPress={() => {}} />
    </ThemedView>
  );
}
```

---

## Components

### Button
```tsx
<Button title="Primary" variant="filled" onPress={handlePress} />
<Button title="Save" icon={{ library: 'Feather', name: 'save' }} />
```
**Variants:** `filled`, `tonal`, `outlined`, `text`, `elevated` | **Sizes:** `xs`, `s`, `m`, `l`, `xl`

### Typography
```tsx
<Typography variant="headlineMedium" weight="bold">Title</Typography>
<Typography variant="bodyMedium" muted>Description</Typography>
```
**Variants:** `display{Large|Medium|Small}`, `headline{...}`, `title{...}`, `body{...}`, `label{...}`

### ThemedView
```tsx
<ThemedView variant="card" style={{ padding: 16 }}>{content}</ThemedView>
```
**Variants:** `background`, `surface`, `surfaceContainer`, `card`, `appbar`, `primary`

### Container
```tsx
<Container columns={2} gap={16}>{children}</Container>  // Responsive grid
<Container maxWidth={800}>{content}</Container>         // Constrained width
```

### Screen
```tsx
<Screen variant="background" scrollable>{content}</Screen>
```

### AppTabs (expo-router)
```tsx
<AppTabs
  brandName="My App"
  tabs={[{ name: 'index', href: '/', label: 'Home', materialIcon: 'home' }]}
/>
```

### Sidebar
```tsx
const { open, toggle } = useSidebar();
<Sidebar header={<SidebarHeader title="App" />}>
  <SidebarItem label="Home" onPress={() => {}} />
</Sidebar>
```

---

## Hooks

### Theme & Brand
```tsx
const theme = useTheme();                    // Colors, spacing, tokens
const { mode, toggleTheme } = useThemeMode(); // Light/dark control
const brand = useBrandConfig();              // Brand name, logo
```

### Responsive
```tsx
// Prefer the lightweight primitives we export:
const { width } = useDimensions();
const isMobile = width < breakpoints.large; // compare to exported breakpoints
// Or use the breakpoint helper:
const isLarge = useBreakpoint('large');
```

### Layout & Sidebar

```tsx
const { isOpen, open, close, toggle } = useSidebar();
const { appBarHeight } = useLayout();
```

Mount the canonical `Sidebar` inside your root layout and have `AppTabs` only trigger it:

```tsx
// app/_layout.tsx
import { Sidebar, SidebarHeader } from 'zero-to-app';

function RootLayout() {
  return (
    <ZeroToApp brand={brand}>
      <Sidebar header={<SidebarHeader title="App" />}>
        {/* SidebarItem links or a shared AppTabsMenu */}
      </Sidebar>
      <Outlet />
    </ZeroToApp>
  );
}
```

In your `AppTabs` (AppBar) component, call `useSidebar().open()` when the hamburger is pressed — do not render a separate drawer locally.

**Breakpoints:** `small` (<768px), `medium` (≥768px), `large` (≥1024px), `xlarge` (≥1280px)

---

## Theme Tokens

```tsx
const theme = useTheme();

// Palette tokens
theme.primary, theme.onPrimary, theme.surface, theme.onSurface, theme.error

// Semantic tokens
theme.tokens.button.filledBg
theme.tokens.card.background
theme.tokens.input.border

// Layout
theme.spacing.lg, theme.borderRadius
```

---

## Development

```bash
pnpm install              # Install deps
pnpm dev:storybook:web    # UI component dev
pnpm dev:demo             # Full app testing
pnpm typecheck            # Type check
pnpm build                # Build package
pnpm release              # Publish to npm
```

**Structure:**
- `zero-to-app/` - Component library (npm package)
- `apps/storybook/` - Isolated component development
- `apps/demo/` - Integrated testing with expo-router

---

## Resources

- [Live Demo](https://zero-to-app.expo.app)
- [Material Design 3](https://m3.material.io)
- [NPM Package](https://www.npmjs.com/package/zero-to-app)
- [GitHub](https://github.com/Alex-Amayo/zero-to-app)

---

MIT License
