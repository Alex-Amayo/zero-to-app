# Migration Guide: StyledText to Typography

## Overview

The `zero-to-app` library has been upgraded to better align with Material Design 3 standards. This guide covers the changes and how to migrate your code.

## What Changed

### 1. New Typography Component

We've introduced a new `Typography` component that follows the Material Design 3 type scale system. The old `StyledText` component is now deprecated but still works for backwards compatibility.

### 2. Enhanced Theme System

The theme system now includes comprehensive M3 tokens:
- `surfaceVariant` and `surfaceTint` tokens
- Six elevation levels (level0 through level5)
- Focus ring configuration for keyboard navigation
- Complete M3 typography scale with proper weights and line-heights

### 3. Improved Button Component

The Button component has been refactored to:
- Use Pressable style callback for proper state management
- Consume theme tokens only (no direct brand.color reads)
- Include focus ring for web/keyboard navigation
- Add platform-specific feedback (ripple on Android)
- Support all five M3 button variants properly

## Migration Path

### Option 1: Keep Using StyledText (No Changes Required)

`StyledText` still works as a backwards-compatible wrapper. Your existing code will continue to function:

```tsx
import { StyledText } from 'zero-to-app';

<StyledText fontSize="lg" bold color="#000">
  Hello World
</StyledText>
```

### Option 2: Migrate to Typography (Recommended)

For better type safety and M3 compliance, migrate to the new `Typography` component:

**Before:**
```tsx
import { StyledText } from 'zero-to-app';

<StyledText fontSize="lg" bold>Hello</StyledText>
<StyledText fontSize="sm" muted>Subtitle</StyledText>
<StyledText fontSize="headline">Title</StyledText>
```

**After:**
```tsx
import { Typography } from 'zero-to-app';

<Typography variant="bodyLarge" weight="bold">Hello</Typography>
<Typography variant="bodySmall" muted>Subtitle</Typography>
<Typography variant="headlineLarge">Title</Typography>
```

### Size Mapping Reference

| StyledText | Typography Variant |
|------------|-------------------|
| `fontSize="sm"` | `variant="bodySmall"` |
| `fontSize="md"` | `variant="bodyMedium"` |
| `fontSize="lg"` | `variant="bodyLarge"` |
| `fontSize="xl"` | `variant="displaySmall"` |
| `fontSize="headline"` | `variant="headlineMedium"` |
| `fontSize="title"` | `variant="titleLarge"` |
| `fontSize="body"` | `variant="bodyMedium"` |
| `fontSize="label"` | `variant="labelMedium"` |
| `fontSize="caption"` | `variant="labelSmall"` |

### Weight Mapping

| StyledText | Typography |
|------------|-----------|
| `bold={true}` | `weight="bold"` |
| `fontWeight={500}` | `weight="medium"` |
| `fontWeight={300}` | `weight="light"` |

## New Typography Variants

Typography now supports the full M3 type scale:

### Display (Largest)
- `displayLarge` (57px)
- `displayMedium` (45px)
- `displaySmall` (36px)

### Headline
- `headlineLarge` (32px)
- `headlineMedium` (28px)
- `headlineSmall` (24px)

### Title
- `titleLarge` (22px)
- `titleMedium` (16px)
- `titleSmall` (14px)

### Body
- `bodyLarge` (16px)
- `bodyMedium` (14px) - Default
- `bodySmall` (12px)

### Label
- `labelLarge` (14px)
- `labelMedium` (12px)
- `labelSmall` (11px)

## New Theme Tokens

Access new theme tokens in your components:

```tsx
import { useTheme } from 'zero-to-app';

function MyComponent() {
  const { values: theme } = useTheme();

  // New surface tokens
  const bg = theme.surfaceVariant;
  const tint = theme.surfaceTint;

  // Elevation levels
  const elevation = theme.tokens.elevation.level2;

  // Focus ring
  const focusColor = theme.tokens.focusRing.color;

  // Typography weights
  const mediumWeight = theme.tokens.typography.weightMedium;
  const lineHeight = theme.tokens.typography.lineHeightNormal;
}
```

## Button Improvements

The Button component now uses theme tokens exclusively:

```tsx
import { Button } from 'zero-to-app';

// All variants properly themed
<Button title="Filled" variant="filled" onPress={() => {}} />
<Button title="Elevated" variant="elevated" onPress={() => {}} />
<Button title="Tonal" variant="tonal" onPress={() => {}} />
<Button title="Outlined" variant="outlined" onPress={() => {}} />
<Button title="Text" variant="text" onPress={() => {}} />
```

Features:
- ✅ Automatic pressed/hover/focus states
- ✅ Platform-specific ripple on Android
- ✅ Focus ring for keyboard navigation on web
- ✅ Proper elevation shadows on elevated variant
- ✅ All colors from theme tokens
- ✅ Eliminated deprecated `raised` prop (use `variant="elevated"`)

## Type Safety Improvements

Export the new `ThemeTokens` type for type-safe token access:

```tsx
import type { ThemeTokens } from 'zero-to-app';

function useButtonTokens(): ThemeTokens['button'] {
  const { values } = useTheme();
  return values.tokens.button;
}
```

## Breaking Changes

- **Button**: The deprecated `raised` prop has been removed. Use `variant="elevated"` instead.
- All other changes are backwards compatible. `StyledText` continues to work as before.

## Deprecation Timeline

- **v2.0**: `Typography` introduced, `StyledText` deprecated
- **v2.x**: Both components supported
- **v3.0**: `StyledText` will be removed (planned for future)

## Questions?

For issues or questions, please file an issue at:
https://github.com/Alex-Amayo/zero-to-app/issues
