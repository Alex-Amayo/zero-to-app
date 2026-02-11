# zero-to-app Development Guide

**Context:** Assisting with development of the `zero-to-app` component library.

---

## Quick Start

### Commands
```bash
pnpm dev:storybook:web   # UI component dev (fastest)
pnpm dev:demo            # Full app with expo-router
pnpm typecheck           # Validate types
pnpm build               # Build package
pnpm release             # Publish to npm
```

### When to Use What
- **Storybook:** Isolated UI (Button, Typography, Card, Input)
- **Demo App:** Navigation, expo-router components, native features

---

## Repository Structure

```
zero-to-app/
├── zero-to-app/           # npm package
│   ├── components/ui/     # UI components
│   ├── components/navigation/  # Nav components
│   ├── theme/             # Theme system
│   ├── hooks/             # Custom hooks
│   └── index.ts           # Public exports
├── apps/storybook/        # Component stories
└── apps/demo/             # Demo app
```

---

## Component Pattern

```tsx
import { useTheme } from '../../theme';

export interface MyComponentProps {
  /** Description */
  title: string;
  /** @default 'medium' */
  size?: 'small' | 'medium' | 'large';
}

export const MyComponent = ({ title, size = 'medium' }: MyComponentProps) => {
  const theme = useTheme();

  return (
    <View style={{ padding: theme.spacing.md }}>
      <Text style={{ color: theme.onSurface }}>{title}</Text>
    </View>
  );
};
```

### Checklist
- [ ] Uses `useTheme()` for colors/spacing (no hardcoded values)
- [ ] TypeScript props with JSDoc
- [ ] Supports light/dark mode
- [ ] Exported from `index.ts`
- [ ] Passes `pnpm typecheck`

---

## Theme System

### Two-Layer Tokens
1. **Palette:** `primary`, `onPrimary`, `surface`, `onSurface`
2. **Semantic:** `tokens.button.filledBg`, `tokens.card.background`

### Usage
```tsx
const theme = useTheme();

// Prefer semantic tokens
const bg = theme.tokens.button.filledBg;

// Fallback to palette
const text = theme.onSurface;

// Layout values
const padding = theme.spacing.lg;
const radius = theme.borderRadius;
```

### Adding Tokens
1. Add to `ThemeValuesType` in `theme/theme-config.ts`
2. Populate in `createLightTheme()` and `createDarkTheme()`

---

## Responsive Hooks

```tsx
// Boolean flags (preferred)
const { isDesktop, isMobile } = useResponsive();

// Responsive values
const padding = useResponsiveValue({ small: 16, large: 32 });

// Single breakpoint check
const isLarge = useBreakpoint('large');

// Raw dimensions (when needed)
const { width, height, breakpoint } = useDimensions();
```

---

## Key Files

| Purpose | Path |
|---------|------|
| Public exports | `zero-to-app/index.ts` |
| Theme config | `zero-to-app/theme/theme-config.ts` |
| Brand creation | `zero-to-app/brand/brand-config.ts` |
| UI components | `zero-to-app/components/ui/` |
| Hooks | `zero-to-app/hooks/` |

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Property 'tokens' does not exist` | Run `pnpm build`, check theme-config.ts |
| `Cannot find module 'zero-to-app'` | Run `pnpm build` |
| Component not themed | Check `.storybook/decorators.tsx` wraps with `<ZeroToApp>` |
| expo-router fails in Storybook | Use Demo app instead |

---

## PR Checklist

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] Tested in Storybook or Demo
- [ ] Types exported from index.ts
- [ ] Works in light/dark mode
