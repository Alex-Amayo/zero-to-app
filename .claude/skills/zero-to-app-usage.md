# zero-to-app Usage Guide

**Context:** Assisting users implementing `zero-to-app` in React Native/Expo projects.

---

## Quick Reference

### Provider Setup
```tsx
import { ZeroToApp, createBrand } from 'zero-to-app';

const brand = createBrand({
  name: 'My App',
  colors: { colorSeed: { primary: '#6750A4' } }, // Auto-generates M3 palette
  fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: 8,
});

// Wrap app in root layout
<ZeroToApp brand={brand}>{children}</ZeroToApp>
```

### Core Hooks
```tsx
const theme = useTheme();              // Colors, spacing, tokens
const { mode, toggleTheme } = useThemeMode(); // Light/dark mode
const brand = useBrandConfig();        // Brand name, logo
const { isDesktop, isMobile } = useResponsive(); // Responsive flags
const padding = useResponsiveValue({ small: 16, large: 32 }); // Responsive values
```

---

## Components

### Button
```tsx
<Button title="Submit" variant="filled" onPress={handlePress} />
<Button title="Cancel" variant="outlined" onPress={handleCancel} />
<Button title="Save" icon={{ library: 'Feather', name: 'save' }} />
```
**Variants:** `filled`, `tonal`, `outlined`, `text`, `elevated`
**Sizes:** `xs`, `s` (default), `m`, `l`, `xl`

### Typography
```tsx
<Typography variant="headlineMedium" weight="bold">Title</Typography>
<Typography variant="bodyMedium" muted>Description</Typography>
```
**Variants:** `display{Large|Medium|Small}`, `headline{Large|Medium|Small}`, `title{Large|Medium|Small}`, `body{Large|Medium|Small}`, `label{Large|Medium|Small}`

### ThemedView
```tsx
<ThemedView variant="surface">{content}</ThemedView>
<ThemedView variant="card" style={{ padding: 16 }}>{content}</ThemedView>
```
**Variants:** `background`, `surface`, `surfaceContainer`, `card`, `appbar`, `primary`

### Container
```tsx
// Constrained width
<Container maxWidth={800}>{content}</Container>

// Responsive grid
<Container columns={2} gap={16}>{children}</Container>
```

### Screen
```tsx
<Screen variant="background" scrollable edges={['top', 'bottom']}>
  {content}
</Screen>
```

---

## Responsive Design

### useResponsive() - Boolean Flags
```tsx
const { isDesktop, isMobile, isTablet, breakpoint } = useResponsive();

return (
  <View style={{ padding: isDesktop ? 40 : 16 }}>
    {isMobile ? <MobileNav /> : <DesktopNav />}
  </View>
);
```

### useResponsiveValue() - Breakpoint Values
```tsx
const padding = useResponsiveValue({ small: 16, medium: 24, large: 32 });
const columns = useResponsiveValue({ small: 1, medium: 2, large: 3 }, 2);
```

### useBreakpoint() - Single Check
```tsx
const isLargeScreen = useBreakpoint('large'); // width >= 1024px
```

**Breakpoints:** `small` (<768px), `medium` (≥768px), `large` (≥1024px), `xlarge` (≥1280px)

---

## Theme Access

```tsx
const theme = useTheme();

// Palette tokens
theme.primary, theme.onPrimary, theme.surface, theme.onSurface

// Semantic tokens
theme.tokens.button.filledBg
theme.tokens.card.background
theme.tokens.input.border

// Layout
theme.spacing.lg, theme.borderRadius
```

---

## Navigation

### AppTabs (requires expo-router)
```tsx
<AppTabs
  brandName="My App"
  tabs={[
    { name: 'index', href: '/', label: 'Home', sfSymbol: { default: 'house' }, materialIcon: 'home' },
    { name: 'profile', href: '/profile', label: 'Profile' },
  ]}
/>
```
- **iOS/Android:** NativeTabs with native icons
- **Web:** Custom app bar

### Sidebar
```tsx
const { open, close, toggle, isOpen } = useSidebar();

<Sidebar header={<SidebarHeader title="App" />}>
  <SidebarSection title="Main">
    <SidebarItem icon={{ library: 'Feather', name: 'home' }} label="Home" onPress={...} />
  </SidebarSection>
</Sidebar>
```

---

## Common Patterns

### Theme-Aware Component
```tsx
function Card({ children }) {
  const theme = useTheme();
  return (
    <View style={{
      backgroundColor: theme.tokens.card.background,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius,
    }}>
      {children}
    </View>
  );
}
```

### Responsive Layout
```tsx
function Layout() {
  const { isDesktop } = useResponsive();
  const padding = useResponsiveValue({ small: 16, large: 32 });

  return (
    <View style={{ flexDirection: isDesktop ? 'row' : 'column', padding }}>
      {children}
    </View>
  );
}
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| `useBrandConfig must be used within <ZeroToApp>` | Wrap app with `<ZeroToApp brand={brand}>` |
| `Module not found: expo-router` | `npx expo install expo-router @expo/vector-icons` |
| Icons show as boxes | Check icon library name (case-sensitive: `'Feather'`, not `'feather'`) |
| Theme not updating | Use `useTheme()` inside component, not at module level |

---

## Resources

- [Main README](../../../README.md)
- [Development Guide](./zero-to-app-dev.md)
- [Material Design 3](https://m3.material.io)
- [Icon Browser](https://icons.expo.fyi)
