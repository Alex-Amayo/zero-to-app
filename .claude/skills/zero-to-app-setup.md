---
description: Use when setting up zero-to-app in a new or existing React Native/Expo project
---

# zero-to-app Setup Guide

**Context:** Assisting users setting up `zero-to-app` in React Native/Expo projects.

---

## Provider Setup

```tsx
import { ZeroToApp, createBrand } from 'zero-to-app';

const brand = createBrand({
  name: 'My App',
  colors: { colorSeed: { primary: '#6750A4' } }, // Auto-generates M3 palette
  fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: { xs: 4, sm: 8, md: 12, lg: 16, xl: 28, full: 9999 },
  shape: { surfaceBorderRadius: 12, buttonBorderRadius: 8 },
});

// Wrap app in root layout
<ZeroToApp brand={brand}>{children}</ZeroToApp>
```

`ZeroToApp` automatically includes `SidebarProvider`, `LayoutProvider`, and `ScrollProvider`.

---

## BrandConfig Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | App/brand name |
| `colors` | `Colors \| { colorSeed: PaletteOptions }` | Yes | Color palette or seed for auto-generation |
| `darkColors` | `Colors \| { colorSeed: PaletteOptions }` | No | Dark theme colors (auto-generated from seed if omitted) |
| `fontSizes` | `{ small, medium, large, xlarge }` | Yes | Font size scale |
| `spacing` | `{ xs, sm, md, lg, xl, xxl, xxxl }` | Yes | Spacing scale |
| `borderRadius` | `BorderRadius` | Yes | `{ xs, sm, md, lg, xl, full }` — border radius scale |
| `shape` | `Shape` | No | `{ surfaceBorderRadius, buttonBorderRadius }` — defaults to `{ 12, 8 }` |
| `logo` | `LogoConfig` | No | `{ light?: ImageSource, dark?: ImageSource }` |
| `footerLinks` | `FooterLinks` | No | `{ links: Array }` |
| `navigation` | `NavigationConfig` | No | `{ items: Array }` |

---

## Palette Generation

### Seed-based (recommended)
```tsx
// Provide one or more seed colors — full M3 palette is generated automatically
const brand = createBrand({
  colors: { colorSeed: { primary: '#6750A4' } },
  // darkColors auto-generated from same seed
  ...
});
```

### Manual colors
```tsx
// Provide every M3 color token explicitly
const brand = createBrand({
  colors: {
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',
    // ... all M3 tokens
  },
  darkColors: { /* dark variants */ },
  ...
});
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| `useBrandConfig must be used within <ZeroToApp>` | Wrap app root with `<ZeroToApp brand={brand}>` |
| `Module not found: expo-router` | `npx expo install expo-router @expo/vector-icons` |
| Icons show as boxes | Check icon library name (case-sensitive: `'Feather'`, not `'feather'`) |
| Theme not updating | Use `useTheme()` inside component, not at module level |
