---
description: Use when working with zero-to-app navigation components like AppBar, Sidebar, Tabs, or expo-router layouts
---

# zero-to-app Navigation

**Context:** Assisting users with `zero-to-app` navigation components (requires expo-router).

---

## Canonical App Structure

This is the proven layout for an app with tabs, native headers, and push screens:

```
src/app/
  index.tsx                  ← Redirect to first tab (see below)
  _layout.tsx                ← ZeroToApp + root Stack
  (tabs)/
    _layout.tsx              ← AppTabs (tab bar definition)
    meetings/                ← Tab with its own Stack (enables NativeHeader + push screens)
      _layout.native.tsx     ← ThemedStack
      _layout.tsx            ← Slot (web fallback)
      index.tsx              ← List screen + NativeHeader
      new.tsx                ← Push screen within tab stack
      [id].tsx               ← Push screen within tab stack
    settings.tsx             ← Flat tab page (no Stack needed)
```

### Root `_layout.tsx`

```tsx
import { Stack } from 'expo-router';
import { ZeroToApp, createBrand, useTheme } from 'zero-to-app';

const brand = createBrand({ ... });

function RootStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'AppName' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ZeroToApp brand={brand}>
      <RootStack />
    </ZeroToApp>
  );
}
```

> Set `title: 'AppName'` on the `(tabs)` Stack.Screen — without it the route group name `(tabs)` leaks into the web page title.

### Root `index.tsx` — redirect to first tab

When tabs don't live at `/`, add a redirect so the app has a valid entry point:

```tsx
import { Redirect } from 'expo-router';
export default function Index() {
  return <Redirect href="/meetings" />;
}
```

### `(tabs)/_layout.tsx` — AppTabs

```tsx
import { AppTabs } from 'zero-to-app';

export default function TabsLayout() {
  return (
    <AppTabs
      brandName="My App"
      tabs={[
        {
          name: 'meetings',       // matches folder name inside (tabs)/
          href: '/meetings',
          label: 'Meetings',
          sfSymbol: { default: 'calendar', selected: 'calendar.fill' },
          materialIcon: 'event',
        },
        {
          name: 'settings',      // matches (tabs)/settings.tsx
          href: '/settings',
          label: 'Settings',
          sfSymbol: { default: 'gearshape', selected: 'gearshape.fill' },
          materialIcon: 'settings',
        },
      ]}
    />
  );
}
```

---

## Two Tab Screen Patterns

### Pattern A — Tab with nested Stack (NativeHeader + push screens)

Use when the tab needs native header buttons or its own push navigation.

**`(tabs)/meetings/_layout.native.tsx`:**
```tsx
import { Stack } from 'expo-router';
import { ThemedStack } from 'zero-to-app';

export default function MeetingsLayout() {
  return (
    <ThemedStack>
      <Stack.Screen name="index" options={{ title: 'Meetings' }} />
      <Stack.Screen name="new" options={{ title: 'New Meeting' }} />
      <Stack.Screen name="[id]" options={{ title: 'Meeting' }} />
    </ThemedStack>
  );
}
```

> **Do NOT use `headerShown: false` on the index screen.** On Android, `NativeHeader` injects into `headerRight`/`headerLeft` — it requires the header bar to be visible. On iOS, `Stack.Toolbar` works regardless, but a consistent title in the header is correct native UX on both platforms.

**`(tabs)/meetings/_layout.tsx` (web fallback — required):**
```tsx
import { Slot } from 'expo-router';
export default function MeetingsLayout() {
  return <Slot />;
}
```

**`(tabs)/meetings/index.tsx`:**
```tsx
// ThemedStack header is visible (title: 'Meetings') — NativeHeader adds buttons to it
// Screen edges={['bottom']} (default) — ThemedStack header covers the top safe area
<Screen variant="background" padded={false} edges={['bottom']}>
  <NativeHeader
    rightIcon="plus"
    onRightPress={() => router.push('/meetings/new')}
    androidRightIcon="plus"
  />
  <FlatList ... />
</Screen>
```

### Pattern B — Flat tab page (no Stack)

Use for simple pages like Settings that don't need push navigation or NativeHeader.

```tsx
// edges={['top', 'bottom']} required — no native header covers the top safe area
<Screen variant="background" edges={['top', 'bottom']}>
  <Container>
    <Typography variant="headlineMedium">Settings</Typography>
  </Container>
</Screen>
```

---

## Safe Area Rules

| Screen type | `edges` to use | Reason |
|-------------|---------------|--------|
| Tab with nested Stack (`index` inside ThemedStack) | `['bottom']` (default) | ThemedStack header handles top |
| Push screen inside tab Stack | `['bottom']` (default) | ThemedStack header handles top |
| Flat tab page (no Stack) | `['top', 'bottom']` | Nothing handles top — notch conflict |

---

## NativeHeader

Adds icon buttons to the native navigation bar. **Requires a Stack context.**

```tsx
<NativeHeader
  rightIcon="plus"           // iOS SF Symbol
  onRightPress={handleAdd}
  androidRightIcon="plus"    // Android Feather icon
  leftIcon="chevron.left"
  onLeftPress={() => router.back()}
/>
```

- **iOS** — `Stack.Toolbar` + SF Symbol buttons
- **Android** — `headerRight`/`headerLeft` Pressable buttons (Feather icons)
- **Web** — renders nothing (safe to include unconditionally)

> **CRITICAL:** `NativeHeader` must only be used inside screens that are within a Stack navigator. Using it directly in a NativeTabs tab screen (without a nested Stack) throws `useCompositionOption must be used within a RouterCompositionOptionsProvider`.

---

## ThemedStack

Wraps expo-router's `Stack` with automatic header theming. Use in `_layout.native.tsx` **inside a tab folder** to give that tab its own Stack context.

```tsx
<ThemedStack>
  <Stack.Screen name="index" options={{ title: 'Home' }} />
  <Stack.Screen name="detail" options={{ title: 'Detail' }} />
</ThemedStack>
```

> **Always pair with a `_layout.tsx` sibling** (Slot or plain Stack) as the web/default fallback — expo-router requires a non-platform layout file.

---

## AppTabs

```tsx
<AppTabs
  brandName="My App"
  tabs={[{ name, href, label, sfSymbol, materialIcon }]}
  externalLinks={[{ label: 'Docs', href: '...' }]}   // web only
  onPrimaryMenuPress={toggle}                          // native hamburger → useSidebar
/>
```

**Platform behaviour:**
- **iOS/Android:** Native tabs via `expo-router/unstable-native-tabs` (NativeTabs) — pure tab bar, **no Stack for push screens**
- **Web:** Fixed top app bar with brand name, tab links, external links

> `NativeTabs` is a tab-only navigator. It provides no Stack context for push screens. All push navigation must come from either the root Stack or a per-tab nested `ThemedStack`.

### AppTabConfig
| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Route name (used for routing) |
| `href` | `string` | Tab route path |
| `label` | `string` | Display label |
| `sfSymbol` | `{ default, selected }` | iOS SF Symbol icons |
| `materialIcon` | `string` | Android Material icon name |
| `webIcon` | `PlatformIcon \| string` | Web-only icon |

Additional `AppTabsProps`: `logoImage`, `height` (web app bar height), `onPrimaryMenuPress` (native hamburger callback).

---

## Sidebar

```tsx
<Sidebar
  anchor="left"
  header={<SidebarHeader title="My App" subtitle="v1.0" logo={logoImage} />}
  footer={<SidebarFooter><Typography muted>Footer</Typography></SidebarFooter>}
>
  <SidebarSection title="Main">
    <SidebarItem icon={{ library: 'Feather', name: 'home' }} label="Home" active onPress={...} />
    <SidebarItem icon={{ name: 'settings' }} label="Settings" onPress={...} />
  </SidebarSection>
</Sidebar>
```

**Platform behavior (web):**
- **Desktop (>=1024px):** Persistent sidebar, fixed below AppBar
- **Mobile (<1024px):** FAB trigger button + animated Drawer overlay

**Props:** `header`, `footer`, `children`, `anchor` (`'left'` | `'right'`, default `'left'`), `style`.

Route scoping: Sidebar captures the route segment on mount and only renders when that route is active (prevents ghost sidebars on cached tabs).

### SidebarItem
- `label`, `icon` (`{ library?, name, size? }`), `active`, `disabled`, `onPress`
- On mobile, automatically closes sidebar on press

### SidebarSection
- `title` (optional uppercase header), `icon`, `children`
- Renders a divider after items

### SidebarHeader
- `title`, `subtitle`, `logo` (image source), `onPress`, or custom `children`

### SidebarFooter
- `children`, `style` — bordered top content area

---

## useSidebar()

```tsx
const { isOpen, open, close, toggle } = useSidebar();
```

Controls sidebar/drawer open state. Provided automatically by `ZeroToApp`.

---

## useRouteNavigation()

Combines `usePathname` + `useRouter` into reusable helpers for sidebar and nav components.

```tsx
const { isActive, navigateTo, pathname } = useRouteNavigation();

// startsWith match (default) — /meetings matches /meetings/new
isActive('/meetings')

// Exact match — use for index routes that are a prefix of sub-routes
isActive('/meetings', { exact: true })

navigateTo('/meetings/new')
```

**Typical sidebar usage:**
```tsx
const { isActive, navigateTo } = useRouteNavigation();

<SidebarItem
  label="Meetings"
  active={isActive('/meetings', { exact: true })}
  onPress={() => navigateTo('/meetings')}
/>
<SidebarItem
  label="New Meeting"
  active={isActive('/meetings/new')}
  onPress={() => navigateTo('/meetings/new')}
/>
```

Use `{ exact: true }` for index routes where the default startsWith match would highlight the item on every sub-page.
