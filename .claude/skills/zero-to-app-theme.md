---
description: Use when working with zero-to-app theming, design tokens, colors, spacing, or responsive hooks
---

# zero-to-app Theme System

**Context:** Assisting users with `zero-to-app` theming, tokens, and responsive hooks.

---

## Core Hooks

### useTheme()
Full theme object with palette colors, semantic tokens, spacing, and layout values.

```tsx
const theme = useTheme();

// Palette tokens
theme.primary, theme.onPrimary, theme.surface, theme.onSurface
theme.primaryContainer, theme.secondaryContainer, theme.tertiaryContainer
theme.surfaceContainer, theme.surfaceContainerHigh, theme.outline

// Semantic tokens
theme.tokens.button.filledBg
theme.tokens.card.background
theme.tokens.input.border

// Spacing scale
theme.spacing.xs       // 4px
theme.spacing.sm       // 8px
theme.spacing.md       // 12px
theme.spacing.lg       // 16px
theme.spacing.xl       // 20px
theme.spacing.xxl      // 24px
theme.spacing.xxxl     // 40px

// Border radius scale
theme.borderRadius.xs    // 4px  — chips, small badges
theme.borderRadius.sm    // 8px  — buttons, inputs, tabs
theme.borderRadius.md    // 12px — collapsible, small FAB
theme.borderRadius.lg    // 16px — cards, medium FAB
theme.borderRadius.xl    // 28px — large FAB, sheets
theme.borderRadius.full  // 9999 — pills, circles

theme.isDark           // boolean
```

### useTokens()
Convenience hook — returns `theme.tokens` directly.

```tsx
const { button, card, focusRing } = useTokens();

const bg = button.filledBg;
const cardBg = card.background;
```

### useThemeMode()
Light/dark mode switching.

```tsx
const { mode, toggleTheme } = useThemeMode();
// mode: 'light' | 'dark'
```

---

## Semantic Token Map

```tsx
tokens.button    // filledBg, filledText, filledHoverBg, filledPressedBg,
                 // elevatedBg, elevatedText, elevatedHoverBg,
                 // tonalBg, tonalText, tonalHoverBg,
                 // outlinedBorder, outlinedText, outlinedHoverBorder,
                 // textColor, textHoverColor, disabledBg, disabledText

tokens.card      // background, text
tokens.input     // background, text, border, placeholder
tokens.appbar    // background, text
tokens.link      // text, hover
tokens.badge     // background, text

tokens.sidebar   // background, itemText, itemActiveText, itemActiveBg,
                 // itemHoverBg, divider, width (280)

tokens.elevation // level0(0), level1(1), level2(3), level3(6), level4(8), level5(12)
tokens.focusRing // color, width(2), offset(2)

tokens.typography // displayLarge(57)..labelSmall(11),
                  // weightLight(300), weightRegular(400), weightMedium(500), weightBold(700),
                  // lineHeightTight(1.2), lineHeightNormal(1.5), lineHeightRelaxed(1.75)
```

---

## High-Contrast Theme

```tsx
import { createHighContrastLightTheme, createHighContrastDarkTheme } from 'zero-to-app';
```

Alternative theme creators for accessibility. Same `ThemeValuesType` shape.

---

## Responsive Hooks

### useDimensions()
Window dimensions and computed breakpoint.

```tsx
const { width, height, breakpoint } = useDimensions();
// breakpoint: 'small' | 'medium' | 'large' | 'xlarge'
```

### useBreakpoint()
Single breakpoint check — returns `true` if width >= breakpoint value.

```tsx
const isLargeScreen = useBreakpoint('large'); // width >= 1024
```

### Breakpoint Values
| Name | Min Width |
|------|-----------|
| `small` | 480px |
| `medium` | 768px |
| `large` | 1024px |
| `xlarge` | 1280px |

### Responsive Pattern
```tsx
import { Platform } from 'react-native';
const { width, breakpoint } = useDimensions();

// Size-based decisions
const columns = breakpoint === 'small' ? 1 : 3;

// Platform-specific logic (use Platform.OS, not hooks)
if (Platform.OS === 'web' && breakpoint === 'small') { ... }
```

---

## Context Hooks

### useLayout()
App-level layout dimensions. Provided by `ZeroToApp`.

```tsx
const { appBarHeight, setAppBarHeight } = useLayout();
```

### useScrollContext()
Shared scroll position (reanimated `SharedValue<number>`). Requires `ScrollProvider`.

```tsx
const scrollY = useScrollContext();
```
