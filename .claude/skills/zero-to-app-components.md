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
**Sizes:** `xs` (32dp), `s` (40dp, default), `m` (56dp), `l` (96dp), `xl` (136dp)

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

Grid props: `columns` (multi-column on medium+ screens, single column on small), `gap`.
`rounded` prop applies `theme.shape.surfaceBorderRadius` (default `true`).

---

## Container

```tsx
<Container maxWidth={800}>{content}</Container>

{/* Inherits ThemedView grid props */}
<Container columns={2} gap={16}>{children}</Container>
```

Constrains content width (default 1000px), centers horizontally, applies `theme.spacing.xl` horizontal padding.
Extends `ThemedView` — all `ThemedViewProps` are available.

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
