---
description: Use when setting up zero-to-app in a new or existing React Native/Expo project
---

# zero-to-app Setup Guide

**Context:** Assisting users setting up `zero-to-app` in React Native/Expo projects.

---

## New Expo Project Setup (Expo SDK 55+)

> **Before starting:** Ask the user for the following if not already provided — do not proceed with placeholders:
> - **App name** — used for the folder name, `app.json` `name`/`slug`/`scheme`, and `brand.name`
> - **Primary color** (hex) — used as the `colorSeed.primary` in `createBrand`

### 1. Scaffold
```bash
npx create-expo-app@latest <app-name> --template blank-typescript
cd <app-name>
```

### 2. Install ALL dependencies via `npx expo install` (never `npm install` directly)
```bash
npx expo install expo-router react-dom react-native-web react-native-safe-area-context react-native-screens react-native-reanimated expo-image zero-to-app @expo/vector-icons
```

> **Critical:** Always use `npx expo install` for every package. It pins SDK-compatible versions automatically. Using `npm install` directly can cause peer dependency conflicts (e.g. `react-dom` version mismatch with `react`).

### 3. Update `package.json` — change `main` to expo-router entry
```json
{
  "main": "expo-router/entry"
}
```

### 4. Update `app.json` — add `scheme` and `web.bundler`
```json
{
  "expo": {
    "scheme": "my-app",
    "userInterfaceStyle": "automatic",
    "web": {
      "bundler": "metro"
    }
  }
}
```

### 5. Do NOT create `babel.config.js`
Expo SDK 55+ handles Babel internally. Creating a `babel.config.js` will cause:
- `Cannot find module 'babel-preset-expo'`
- `Config file contains no configuration data`

Reanimated 4.x on the new architecture also does not need the Babel plugin.

### 6. Remove old entry files
Delete `App.tsx` and `index.ts` — expo-router takes over as the entry point.

### 7. Extract brand to a shared file
```ts
// config/brand.ts
import { createBrand } from 'zero-to-app';

export const brand = createBrand({
  name: 'My App',
  colors: { colorSeed: { primary: '#6750A4' } },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: { xs: 4, sm: 8, md: 12, lg: 16, xl: 28, full: 9999 },
  shape: { surfaceBorderRadius: 12, buttonBorderRadius: 9999 },
});
```

Import this in both layouts — never duplicate the brand definition.

### 8. Create platform-split layouts

**`app/_layout.tsx`** (web — AppBar via AppTabs):
```tsx
import { ZeroToApp, AppTabs } from 'zero-to-app';
import { brand } from '../config/brand';

export default function RootLayout() {
  return (
    <ZeroToApp brand={brand}>
      <AppTabs
        brandName="My App"
        tabs={[
          {
            name: 'index',
            href: '/',
            label: 'Home',
            sfSymbol: { default: 'house', selected: 'house.fill' },
            materialIcon: 'home',
            webIcon: { library: 'Feather', name: 'home' },
          },
        ]}
      />
    </ZeroToApp>
  );
}
```

**`app/_layout.native.tsx`** (iOS/Android — ThemedStack):
```tsx
import { Stack } from 'expo-router';
import { ZeroToApp, ThemedStack } from 'zero-to-app';
import { brand } from '../config/brand';

export default function RootLayout() {
  return (
    <ZeroToApp brand={brand}>
      <ThemedStack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
      </ThemedStack>
    </ZeroToApp>
  );
}
```

---

## Provider Setup (existing projects)

```tsx
import { ZeroToApp, createBrand } from 'zero-to-app';

const brand = createBrand({
  name: 'My App',
  colors: { colorSeed: { primary: '#6750A4' } },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: { xs: 4, sm: 8, md: 12, lg: 16, xl: 28, full: 9999 },
  shape: { surfaceBorderRadius: 12, buttonBorderRadius: 8 },
});

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
const brand = createBrand({
  colors: { colorSeed: { primary: '#6750A4' } },
  // darkColors auto-generated from same seed
  ...
});
```

### Manual colors
```tsx
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
| `Cannot find module 'babel-preset-expo'` | Delete `babel.config.js` — Expo 55+ doesn't need it |
| `Config file contains no configuration data` | Delete `babel.config.js` — it's empty or stale |
| `react-dom` peer dep conflict | Use `npx expo install react-dom` not `npm install react-dom` |
| `Module not found: expo-router` | `npx expo install expo-router @expo/vector-icons` |
| Icons show as boxes | Check icon library name (case-sensitive: `'Feather'`, not `'feather'`) |
| Theme not updating | Use `useTheme()` inside component, not at module level |
