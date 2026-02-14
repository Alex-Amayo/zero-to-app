---
description: Use when working with zero-to-app navigation components like AppBar, Sidebar, Tabs, or expo-router layouts
---

# zero-to-app Navigation

**Context:** Assisting users with `zero-to-app` navigation components (requires expo-router).

---

## AppTabs

```tsx
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
    { name: 'profile', href: '/profile', label: 'Profile' },
  ]}
  externalLinks={[{ label: 'Docs', href: 'https://docs.example.com' }]}
/>
```

**Platform behavior:**
- **iOS/Android:** Native tabs via `expo-router/unstable-native-tabs` (NativeTabs)
- **Web:** Custom app bar with brand name, tabs, and optional external links

### AppTabConfig
| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Route name (used for routing) |
| `href` | `string` | Tab route path |
| `label` | `string` | Display label |
| `sfSymbol` | `{ default, selected }` | iOS SF Symbol icons |
| `materialIcon` | `string` | Android Material icon name |
| `webIcon` | `any` | Web-only icon |

Additional `AppTabsProps`: `logoImage`, `height` (web app bar height), `onPrimaryMenuPress` (native hamburger callback).

---

## Sidebar

```tsx
const { open, close, toggle, isOpen } = useSidebar();

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

## Drawer

```tsx
<Drawer isOpen={isOpen} onClose={close} side="left" header={...} footer={...}>
  {children}
</Drawer>
```

Standalone animated overlay panel. Slides in from `side` (`'left'` | `'right'`, default `'left'`) with backdrop. Uses `react-native-reanimated`.

**Props:** `isOpen`, `onClose`, `side`, `header`, `footer`, `children`, `style`.

---

## NativeHeader

```tsx
<NativeHeader
  rightIcon="gearshape"
  onRightPress={openSettings}
  leftIcon="line.3.horizontal"
  onLeftPress={toggleMenu}
/>
```

iOS-only toolbar buttons using SF Symbols, rendered via `Stack.Toolbar` from expo-router. Place inside screen components, not layouts.

**Props:** `rightIcon`, `onRightPress`, `leftIcon`, `onLeftPress`.

---

## useSidebar()

```tsx
const { isOpen, open, close, toggle } = useSidebar();
```

Controls sidebar/drawer open state. Provided automatically by `ZeroToApp`.
