---
description: Use when adding a new component to the zero-to-app library — covers the full workflow from component file to theme tokens, Storybook story, demo page, and nav wiring
---

# zero-to-app Contributing Guide — Adding a New Component

**Context:** Full step-by-step checklist for adding a new UI component to the `zero-to-app` package.

---

## Complete Checklist

For a component named `Chip` (adjust names throughout):

- [ ] 1. Add theme tokens to `zero-to-app/theme/theme-config.ts`
- [ ] 2. Create `zero-to-app/components/ui/chip.tsx`
- [ ] 3. Export from `zero-to-app/components/ui/index.ts`
- [ ] 4. Create `apps/storybook/components/Chip/Chip.stories.tsx`
- [ ] 5. Create `apps/demo/src/app/explore/chip.tsx`
- [ ] 6. Add to `apps/demo/src/config/nav.ts`
- [ ] 7. Add `<Stack.Screen>` to `apps/demo/src/app/explore/_layout.native.tsx`
- [ ] 8. Run `pnpm build && pnpm typecheck` — must pass clean

> Root `zero-to-app/index.ts` uses `export * from './components'` which covers `./components/ui/index.ts` automatically — no change needed there.

---

## Step 1 — Theme Tokens

Add a token block to `ThemeTokens` type in `zero-to-app/theme/theme-config.ts`:

```ts
// In ThemeTokens type
chip: {
  filledBg: string;
  filledText: string;
  outlinedBorder: string;
  outlinedText: string;
  selectedBg: string;
  selectedText: string;
  disabledBg: string;
  disabledText: string;
  disabledBorder: string;
};
```

Then populate in `createLightTheme(brand)`, `createDarkTheme(brand)`, and both functions in `high-contrast-theme.ts`:

```ts
chip: {
  filledBg: c.secondaryContainer,
  filledText: c.onSecondaryContainer,
  outlinedBorder: c.outline,
  outlinedText: c.onSurface,
  selectedBg: c.secondaryContainer,
  selectedText: c.onSecondaryContainer,
  disabledBg: c.surfaceContainerLow,
  disabledText: c.onSurfaceVariant,
  disabledBorder: c.outlineVariant ?? c.outline,
},
```

Common palette color names: `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`, `secondary`, `onSecondary`, `secondaryContainer`, `onSecondaryContainer`, `tertiary`, `onTertiary`, `tertiaryContainer`, `onTertiaryContainer`, `surface`, `onSurface`, `onSurfaceVariant`, `surfaceContainer`, `surfaceContainerLow`, `surfaceContainerHigh`, `surfaceContainerHighest`, `outline`, `outlineVariant`, `shadow`, `scrim`.

---

## Step 2 — Component File

File: `zero-to-app/components/ui/chip.tsx`

```tsx
// 1. IMPORTS
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Typography } from './typography';
import { useTheme } from '../../theme';
import { blurOnWeb } from '../shared/utils';
import type { InteractiveComponentProps } from '../shared/types';

// 2. TYPES
export type ChipVariant = 'filled' | 'outlined';
export const ChipVariants = ['filled', 'outlined'] as const;

export interface ChipProps extends InteractiveComponentProps {
  label: string;
  variant?: ChipVariant;
  selected?: boolean;
  // ... component-specific props
}

// 3. COMPONENT
const Chip = ({ label, variant = 'outlined', ... }: ChipProps) => {
  const theme = useTheme();
  const t = theme.tokens.chip;
  // ...
};

Chip.displayName = 'Chip';

// 4. STYLES
const styles = StyleSheet.create({ ... });

// 5. EXPORTS
export { Chip };
```

### Key patterns

**Touch target vs visual size (small components)**
For components smaller than 48dp (chips, icon buttons), separate the touch target from the visual element:
```tsx
// Pressable: transparent, no background — touch target extended via hitSlop
<Pressable style={styles.pressable} hitSlop={8} onPress={...}>
  {/* Inner View: owns all visual styles — background, border, borderRadius, height */}
  <View style={[styles.chip, { backgroundColor: bg, borderRadius, ... }]}>
    {content}
  </View>
</Pressable>

// Styles
pressable: { alignSelf: 'flex-start' },          // transparent, sizes to children
chip: { height: 32, minWidth: 56, ... },          // visual 32dp, touch target is 32+8+8=48dp via hitSlop
```

Do NOT put `minHeight: 48` on the same element that has a background — this makes the component appear taller than 32dp.

**Web focus ring — blur after press**
Always import and call `blurOnWeb` inside `onPress` on interactive components. This prevents the focus ring from lingering after mouse clicks while preserving keyboard focus behaviour:
```tsx
import { blurOnWeb } from '../shared/utils';

// In component:
onPress={disabled ? undefined : (e) => {
  blurOnWeb(e);
  onPress?.(e);
}}
```
Apply to every `Pressable` that has a visual focus state, including nested ones (e.g. icon buttons within a chip).

**Other standard patterns**
- Use `useTheme()` — never hardcode colors or spacing
- Extend `InteractiveComponentProps` for `disabled`, `onPress`, `style`, `testID`, `accessibilityLabel`
- Extend `LoadableComponentProps` if the component can show a loading spinner
- Shape: use `theme.borderRadius.sm` (8dp, M3 CornerSmall) for chips/inputs, `theme.shape.surfaceBorderRadius` for cards/surfaces, `theme.borderRadius.full` for pills
- `android_ripple` on the Pressable for Android press feedback
- Hover/focus states via `useState` + `onHoverIn`/`onHoverOut`/`onFocus`/`onBlur`
- `accessibilityRole="button"` and `accessibilityState={{ disabled, selected }}` where applicable

### Shared types (`components/shared/types.ts`)
```ts
InteractiveComponentProps   // testID, style, disabled, onPress, accessibilityLabel, accessibilityHint, accessibilityRole
LoadableComponentProps      // loading
ContainerComponentProps     // children, contentStyle
BaseComponentProps          // testID, style
```

### Shared utils (`components/shared/utils.ts`)
```ts
blurOnWeb(e)  // call inside onPress to clear focus ring after mouse click on web
```

---

## Step 3 — Export from UI index

Add to `zero-to-app/components/ui/index.ts`:

```ts
export { Chip } from './chip';
export type { ChipProps, ChipVariant } from './chip';
export { ChipVariants } from './chip';
```

---

## Step 4 — Storybook Story

File: `apps/storybook/components/Chip/Chip.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, ChipVariants } from 'zero-to-app';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    label: 'Chip',
    variant: 'outlined',
    selected: false,
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ChipVariants as unknown as string[] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onPress: { action: 'pressed' },
  },
  decorators: [(Story: any) => <View style={styles.container}><Story /></View>],
} as unknown as Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive playground — every prop wired to controls panel
export const Playground: Story = {};

// Static gallery — variants side by side, no controls needed
export const Variants: Story = {
  render: () => (
    <View style={styles.row}>
      <Chip label="Outlined" variant="outlined" />
      <Chip label="Filled" variant="filled" />
    </View>
  ),
};

// Additional named stories for states/behaviours
export const States: Story = {
  render: () => (
    <View style={styles.row}>
      <Chip label="Default" />
      <Chip label="Selected" selected />
      <Chip label="Disabled" disabled />
    </View>
  ),
};

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 8 },
});
```

### Story rules
- **Always include `Playground`** — wires all props to Storybook controls panel
- **Always include a gallery story** — static render showing variants side by side
- **`as unknown as Meta<typeof Component>`** — required workaround for RN Storybook type issues
- Stories live in `apps/storybook/components/<ComponentName>/<ComponentName>.stories.tsx`
- Import from `'zero-to-app'` (workspace link, no build needed)

---

## Step 5 — Demo Page

File: `apps/demo/src/app/explore/chip.tsx`

```tsx
import React from 'react';
import { View } from 'react-native';
import { Chip, Typography } from 'zero-to-app';
import { DemoSection } from '../../components/demo-section';
import { DocsPagination } from '../../components/docs-pagination';
import { PropsTable, type PropDefinition } from '../../components/props-table';
import { DocsPage } from '../../components/docs-page';

const chipProps: PropDefinition[] = [
  { name: 'label', type: 'string', description: 'Chip label text' },
  { name: 'variant', type: "'filled' | 'outlined'", default: "'outlined'", description: '...' },
  // ...
];

export default function ChipPage() {
  return (
    <DocsPage title="Chip" description="...">
      <DemoSection title="Variants" description="..." code={`<Chip label="Outlined" />`}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Chip label="Outlined" />
          <Chip label="Filled" variant="filled" />
        </View>
      </DemoSection>

      <Typography variant="titleLarge" weight="medium">Props</Typography>
      <PropsTable props={chipProps} />
      <DocsPagination />
    </DocsPage>
  );
}
```

`DocsPage` auto-wires NativeHeader sidebar toggle, Screen, and scroll.

---

## Step 6 — Nav Config

Add to `apps/demo/src/config/nav.ts` in `NAV_SECTIONS`:

```ts
{ label: 'Chip', route: '/explore/chip' },
```

`NAV_PAGES` derives automatically via `flatMap`. Both `DocsPagination` (prev/next) and sidebar update from this single source.

---

## Step 7 — Layout Screen

Add to `apps/demo/src/app/explore/_layout.native.tsx` inside `<ThemedStack>`:

```tsx
<Stack.Screen name="chip" options={{ title: 'Chip' }} />
```

> The native layout file is `_layout.native.tsx` (covers iOS and Android). There is no `_layout.ios.tsx`.

---

## Step 8 — Build & Typecheck

```bash
pnpm build && pnpm typecheck
```

Must pass clean. The build step is required because `apps/demo` and `apps/storybook` consume `zero-to-app` from `dist/`, not source. Common issues:
- Token added to type but missing from `createLightTheme`, `createDarkTheme`, or `high-contrast-theme.ts` (or vice versa)
- Forgot to export from `components/ui/index.ts`
- Storybook `decorators.tsx` has pre-existing TS errors — ignore those, they are unrelated
