---
description: Use when working with zero-to-app UI components like Button, Typography, ThemedView, Collapsible, etc.
---

# zero-to-app Components

**Context:** Assisting users with `zero-to-app` UI components.

---

## Button

```tsx
<Button title="Submit" variant="filled" onPress={handlePress} />
<Button title="Cancel" variant="outlined" onPress={handleCancel} />
<Button title="Save" icon={{ library: 'Feather', name: 'save' }} />
<Button title="Loading..." loading />
```

**Variants:** `filled` (default), `elevated`, `tonal`, `outlined`, `text`
**Sizes:** `small` (32dp), `medium` (40dp, default), `large` (56dp)

### IconConfig
```tsx
interface IconConfig {
  library?: IconLibrary;  // default: 'Feather'
  name: string;
  size?: number;          // default: 18
  color?: string;         // defaults to button text color
}
```

Additional props: `iconPosition` (`'left'` | `'right'`, default `'right'`), `color`, `backgroundColor`, `loading`, `disabled`.

---

## Typography

```tsx
<Typography variant="headlineMedium" weight="bold">Title</Typography>
<Typography variant="bodyMedium" muted>Description</Typography>
<Typography variant="labelLarge" uppercase>LABEL</Typography>
<Typography variant="displayMedium" align="center">Hero</Typography>
```

**15 M3 variants:**
- `display{Large|Medium|Small}` — 57/45/36px
- `headline{Large|Medium|Small}` — 32/28/24px
- `title{Large|Medium|Small}` — 22/16/14px
- `body{Large|Medium|Small}` — 16/14/12px
- `label{Large|Medium|Small}` — 14/12/11px

**Weight:** `'light'` | `'regular'` | `'medium'` | `'bold'` | numeric (100-900)
**Props:** `align`, `color`, `muted`, `uppercase`, `numberOfLines`

---

## ThemedView

```tsx
<ThemedView variant="surface">{content}</ThemedView>
<ThemedView variant="card" style={{ padding: 16 }}>{content}</ThemedView>

{/* Responsive grid */}
<ThemedView columns={2} gap={16}>
  <View>Col 1</View>
  <View>Col 2</View>
</ThemedView>
```

**Variants:** `background`, `surface` (default), `surfaceContainer`, `card`, `appbar`, `primary`

> **Note:** `background` and `surface` map to the same color (`theme.surface`). `background` is a semantic hint for intent only — there is no visual difference.

Grid props: `columns` (multi-column on medium+ screens ≥768px, single column on small), `gap`.
`rounded` prop applies `theme.shape.surfaceBorderRadius` (default `true`).

---

## Container

```tsx
<Container maxWidth={800}>{content}</Container>

{/* Inherits ThemedView grid props */}
<Container columns={2} gap={16}>{children}</Container>
```

Constrains content width (default 1000px), centers horizontally (`alignSelf: 'center'`), applies `theme.spacing.xl` horizontal padding.
Extends `ThemedView` — all `ThemedViewProps` are available.

> **Note:** `Container` always renders with `rounded={false}` internally. Passing a `rounded` prop has no effect — border radius must be applied via `style` if needed.

---

## Screen

```tsx
<Screen scrollable variant="background" edges={['top', 'bottom']}>
  {content}
</Screen>

{/* Full-bleed layout (no vertical padding) */}
<Screen scrollable variant="background" padded={false}>
  <ImageBackground>{hero}</ImageBackground>
  <Container>{content}</Container>
</Screen>
```

**Props:**
- `scrollable` — wraps in `ScrollView` (default `false`)
- `variant` — `ThemedViewVariant` (default `'background'`)
- `edges` — safe area edges (default `['bottom']`)
- `padded` — applies default vertical padding from `theme.spacing.xxl` (default `true`). Set to `false` for full-bleed layouts (e.g. hero images)
- `contentContainerStyle` — styles for ScrollView content (when scrollable). Applied after `padded`, so can override padding
- `showsVerticalScrollIndicator` — default `true`

---

## Chip

```tsx
// Outlined (default) — border, transparent background
<Chip label="Design" onPress={() => {}} />

// Filled — solid secondaryContainer background, no border
<Chip label="TypeScript" variant="filled" onPress={() => {}} />

// Filter chip — selected prop shows leading checkmark
<Chip label="Wireless" selected={on} onPress={() => setOn(v => !v)} />

// Trailing icon (decorative)
<Chip label="Favourite" icon={{ name: 'star' }} />

// Trailing icon with independent press handler
<Chip label="React Native" variant="filled" icon={{ name: 'x' }} onIconPress={() => remove()} />
```

**Variants:** `outlined` (default), `filled`
**Shape:** M3 CornerSmall — 8dp border radius
**Size:** 32dp height, 48dp touch target via `hitSlop={8}`, `minWidth: 56`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Chip label text |
| `variant` | `'filled' \| 'outlined'` | `'outlined'` | Visual style |
| `selected` | `boolean` | `false` | Shows leading checkmark, uses selectedBg |
| `icon` | `ChipIconConfig` | — | Trailing icon (right of label) |
| `onPress` | `() => void` | — | Press handler for the whole chip |
| `onIconPress` | `() => void` | — | Makes trailing icon a separate pressable target |
| `disabled` | `boolean` | `false` | Disables interaction, reduces opacity |

---

## FAB (Floating Action Button)

```tsx
<FAB icon={{ name: 'plus' }} onPress={() => {}} />
<FAB icon={{ name: 'edit-2' }} label="Compose" onPress={() => {}} />
<FAB icon={{ name: 'arrow-up' }} variant="surface" size="small" onPress={() => {}} />
```

**Variants:** `primary` (default), `secondary`, `tertiary`, `surface`
**Sizes:** `small` (40dp), `medium` (56dp, default), `large` (96dp)

When `label` is provided, renders as an **Extended FAB**.

---

## Collapsible

```tsx
{/* Uncontrolled */}
<Collapsible title="More details">
  <Typography>Hidden content</Typography>
</Collapsible>

{/* Controlled */}
const [open, setOpen] = useState(false);
<Collapsible title="Settings" open={open} onToggle={setOpen}>
  <Typography>Content</Typography>
</Collapsible>
```

**Props:**
- `open` — controlled state (makes component controlled)
- `defaultOpen` — initial state for uncontrolled (default `false`)
- `onToggle` — callback `(isOpen: boolean) => void`
- `headerVariant` — `'surface'` | `'surfaceContainer'` | `'card'` | `'primary'` (default `'surfaceContainer'`)
- `contentVariant` — `'surface'` | `'surfaceContainer'` | `'card'` (default `'surfaceContainer'`)

Animated expand/collapse with chevron rotation (uses `react-native-reanimated`).

---

## ThemedImage

```tsx
import { ThemedImage } from 'zero-to-app';

<ThemedImage
  lightSource={require('./logo_black.png')}
  darkSource={require('./logo_white.png')}
  style={{ width: 32, height: 32 }}
  contentFit="contain"
/>
```

Wraps `expo-image`'s `Image` and automatically switches between light/dark sources based on the current theme mode.

**Props:**
- `lightSource` — `ImageSource` shown in light mode
- `darkSource` — `ImageSource` shown in dark mode
- All other `ImageProps` from `expo-image` are spread through (`style`, `contentFit`, `transition`, `placeholder`, etc.)

---

## AppTabs

Top-level navigation component. Place in the root `_layout.tsx` inside `ZeroToApp`.

```tsx
<AppTabs
  brandName="My App"
  logoImage={<MyLogo />}
  tabs={[
    {
      name: 'home',
      href: '/(tabs)/home',
      label: 'Home',
      sfSymbol: { default: 'house', selected: 'house.fill' }, // iOS
      materialIcon: 'home',                                    // Android
      webIcon: { library: 'Feather', name: 'home' },          // Web
    },
  ]}
  externalLinks={[{ label: 'GitHub', href: 'https://github.com/...' }]}
  onPrimaryMenuPress={toggle} // wire to useSidebar().toggle on native
/>
```

**Platform behaviour:**
- **iOS/Android** — native bottom tab bar (`expo-router/unstable-native-tabs`), tinted with `theme.primary`
- **Web desktop (≥1024dp)** — fixed top header with logo, tab buttons, external links
- **Web mobile (<1024dp)** — compact header + hamburger → animated drawer

`onPrimaryMenuPress` connects the native hamburger to `useSidebar().toggle`.

---

## Sidebar

Responsive navigation sidebar. Persistent panel on desktop, modal drawer on mobile.

```tsx
<Sidebar
  header={<SidebarHeader title="Docs" subtitle="My App" onPress={() => navigateTo('/home')} />}
  footer={<SidebarFooter><Typography variant="bodySmall" muted>v1.0.0</Typography></SidebarFooter>}
>
  <SidebarSection title="Getting Started" icon={{ name: 'code' }}>
    <SidebarItem
      label="Installation"
      icon={{ name: 'download' }}
      active={isActive('/install', { exact: true })}
      onPress={() => navigateTo('/install')}
    />
  </SidebarSection>
</Sidebar>
```

**Responsive behaviour:**
- **Desktop (≥1024dp)** — persistent 280dp left panel
- **Mobile (<1024dp)** — modal drawer; `SidebarItem` press auto-closes it

**Context:** `useSidebar()` → `{ open, close, toggle, isOpen }` — available anywhere under `ZeroToApp`.

**Active routes:** Use `useRouteNavigation()` → `isActive(route, { exact?: boolean })`. Always pass `exact: true` for index routes that are a prefix of sub-routes.

**Layout pattern:**
```tsx
// _layout.tsx (web) — flex row
<View style={{ flex: 1, flexDirection: 'row' }}>
  <Sidebar ...><nav items /></Sidebar>
  <ThemedView variant="background" style={{ flex: 1 }}><Slot /></ThemedView>
</View>

// _layout.native.tsx — fragment (Sidebar overlays as modal)
<>
  <Sidebar ...><nav items /></Sidebar>
  <ThemedStack><Stack.Screen ... /></ThemedStack>
</>
```

**Sub-components:**
- `SidebarHeader` — `title`, `subtitle`, `logo`, `onPress`, `children`
- `SidebarSection` — `title`, `icon`, `children` (groups items with optional header + divider)
- `SidebarItem` — `label`, `icon`, `active`, `onPress`, `disabled`
- `SidebarFooter` — `children` (sticky footer with top divider)

---

## Drawer

Low-level animated side drawer. Used internally by Sidebar and AppTabs. Use directly for custom non-navigation overlays.

```tsx
const [open, setOpen] = useState(false);

<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  side="left"              // 'left' (default) | 'right'
  header={<SidebarHeader title="Menu" />}
  footer={<View><Typography>Footer</Typography></View>}
>
  <Typography style={{ padding: 16 }}>Scrollable content</Typography>
</Drawer>
```

Fixed width 280dp. 250ms slide animation + backdrop fade (react-native-reanimated). Backdrop tap triggers `onClose`.

> Prefer `Sidebar` over `Drawer` for navigation — Sidebar adds responsive behaviour and route awareness automatically.

---

## ThemedStack

Wraps Expo Router's `Stack` with automatic header theming (`headerStyle`, `headerTintColor`, `headerBackVisible`, `headerBackButtonDisplayMode`) from the design token system. Use in `_layout.native.tsx` to cover both iOS and Android with one file.

```tsx
// _layout.native.tsx
import { Stack } from 'expo-router';
import { ThemedStack } from 'zero-to-app';

export default function Layout() {
  return (
    <ThemedStack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="detail" options={{ title: 'Detail' }} />
    </ThemedStack>
  );
}
```

User `screenOptions` are merged on top of the defaults and always win. Both object and function forms supported.

---

## NativeHeader

Screen-level header buttons for iOS and Android. Renders nothing on web — safe to include unconditionally.

```tsx
import { NativeHeader, useSidebar } from 'zero-to-app';

export default function MyScreen() {
  const { open } = useSidebar();
  return (
    <>
      <NativeHeader
        rightIcon="sidebar.left"   // iOS — SF Symbol name
        onRightPress={open}
        androidRightIcon="menu"    // Android — Feather icon name
      />
      {/* screen content */}
    </>
  );
}
```

**Platform behaviour:**
- **iOS** — `Stack.Toolbar` + `Stack.Toolbar.Button` with SF Symbol icons
- **Android** — `Stack.Screen` with `headerRight`/`headerLeft` Pressable buttons (Feather icons)
- **Web** — returns `null`

**Props:** `rightIcon`, `onRightPress`, `leftIcon`, `onLeftPress` (iOS SF Symbol names); `androidRightIcon`, `androidLeftIcon` (Android Feather icon names).

> `DocsPage` pre-wires `NativeHeader` with the sidebar toggle and hides the title block on Android (stack header already shows it).
