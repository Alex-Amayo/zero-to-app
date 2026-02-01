# zero-to-app Development Guide

**Context:** You are assisting with development of the `zero-to-app` component library, a Material Design 3 UI library for React Native and Expo.

---

## Repository Structure

This is a **pnpm monorepo** with the following structure:

```
zero-to-app/
├── zero-to-app/              # Publishable component library (npm package)
│   ├── components/
│   │   ├── ui/              # Primitive UI components (Button, Typography, etc.)
│   │   └── navigation/      # Navigation components (AppTabs, etc.)
│   ├── theme/               # Theme system and M3 tokens
│   ├── brand/               # Brand configuration and palette generation
│   ├── hooks/               # Custom hooks (useDimensions, useTheme, useBrand)
│   ├── utils/               # Icon utilities, contrast checker
│   └── index.ts             # Public API exports
├── apps/
│   ├── storybook/           # Storybook for isolated component development
│   └── demo/                # Demo Expo app for integrated testing
└── package.json             # Monorepo root with workspace scripts
```

**Key Files:**
- `zero-to-app/index.ts` - Public API exports
- `zero-to-app/theme/theme-config.ts` - M3 token definitions and theme creators
- `zero-to-app/brand/brand-config.ts` - Brand creation and palette generation
- `zero-to-app/package.json` - Package configuration with exports map
- `README.md` - Primary documentation (usage + development)

---

## Development Workflow

### Critical Decision: Storybook vs Demo App

**Use Storybook (Preferred for Isolated Components):**
```bash
pnpm dev:storybook:web      # Fast web-based development
pnpm dev:storybook          # Native Expo Storybook
pnpm dev:storybook:ios      # iOS device testing
pnpm dev:storybook:android  # Android device testing
```

**When to use Storybook:**
- ✅ Isolated UI components (Button, Typography, Card, Input, etc.)
- ✅ Testing component variants and states
- ✅ Visual regression testing
- ✅ Component documentation
- ✅ Props exploration and edge cases

**Storybook Limitations:**
- ❌ expo-router components (navigation context required)
- ❌ File system dependencies
- ❌ Complex native dependencies
- **Rule:** Don't spend time creating complex mocks for React Native/Storybook interop

**Use Demo App (For Integrated Components):**
```bash
pnpm dev:demo              # Start Expo dev server
pnpm dev:demo:ios          # iOS simulator
pnpm dev:demo:android      # Android emulator
pnpm dev:demo:web          # Web browser
```

**When to use Demo:**
- ✅ Navigation components (AppTabs requires expo-router)
- ✅ Components with expo-router context
- ✅ Integration testing with real navigation
- ✅ File system or native API dependencies
- ✅ Full app flow testing

---

## Material Design 3 Token System

### Architecture

The library implements a **two-layer token system**:

1. **Palette Tokens** (M3 color roles): `primary`, `onPrimary`, `surface`, `onSurface`, etc.
2. **Semantic Tokens** (component-specific): `tokens.button.filledBg`, `tokens.input.border`, etc.

### Theme Access Patterns

**In Components:**
```tsx
import { useTheme } from '../../theme';

function MyComponent() {
  const { values: theme } = useTheme();

  // Prefer semantic tokens
  const bgColor = theme.tokens.button.filledBg;

  // Fallback to palette tokens
  const textColor = theme.onSurface;

  return (
    <View style={{ backgroundColor: bgColor }}>
      <Text style={{ color: textColor }}>Hello</Text>
    </View>
  );
}
```

**Brand Configuration Access:**
```tsx
import { useBrand } from '../../brand';

function MyComponent() {
  const brand = useBrand();

  return (
    <View style={{
      padding: brand.spacing.lg,
      borderRadius: brand.borderRadius
    }}>
      <Text style={{ fontSize: brand.fontSizes.large }}>
        {brand.name}
      </Text>
    </View>
  );
}
```

### Adding New Tokens

**When to add tokens:**
- Token is used by 3+ components
- Token represents a semantic concept (not ad-hoc styling)
- Token aligns with M3 design system

**Process:**

1. **Update `ThemeValuesType` in `theme/theme-config.ts`:**
```tsx
export interface ThemeValuesType {
  // ... existing tokens
  tokens: {
    // ... existing semantic tokens
    chip: {
      background: string;
      text: string;
      outlineBorder: string;
    };
  };
}
```

2. **Populate in both theme creators:**
```tsx
export const createLightTheme = (brand: Brand): ThemeValuesType => {
  const c = brand.colors;
  return {
    // ... existing values
    tokens: {
      // ... existing tokens
      chip: {
        background: c.surfaceContainerLow,
        text: c.onSurface,
        outlineBorder: c.outlineVariant,
      },
    },
  };
};

export const createDarkTheme = (brand: Brand): ThemeValuesType => {
  const c = brand.darkColors ?? brand.colors;
  return {
    // ... same structure for dark theme
  };
};
```

3. **Use in components:**
```tsx
function Chip() {
  const { values: theme } = useTheme();

  return (
    <View style={{
      backgroundColor: theme.tokens.chip.background,
      borderColor: theme.tokens.chip.outlineBorder
    }}>
      <Text style={{ color: theme.tokens.chip.text }}>Label</Text>
    </View>
  );
}
```

---

## Component Development Pattern

### File Structure

Every component follows this structure:

```tsx
// 1. IMPORTS
import React, { forwardRef } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { useBrand } from '../../brand';

// 2. TYPES
export interface MyComponentProps {
  /** JSDoc description */
  title: string;
  /** @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  style?: ViewStyle;
}

// 3. COMPONENT
export const MyComponent = forwardRef<View, MyComponentProps>(
  ({ title, size = 'medium', onPress, style }, ref) => {
    const { values: theme } = useTheme();
    const brand = useBrand();

    return (
      <View ref={ref} style={[styles.container, style]}>
        {/* Component content */}
      </View>
    );
  }
);

MyComponent.displayName = 'MyComponent';

// 4. STYLES
const styles = StyleSheet.create({
  container: {
    // Static styles only
    // Use inline styles for theme-dependent values
  },
});

// 5. EXPORTS (handled in index.ts)
```

### Component Checklist

When creating a new component:

- [ ] Use functional component with `forwardRef`
- [ ] TypeScript props interface with JSDoc
- [ ] Use semantic tokens from theme (not ad-hoc colors)
- [ ] Support light/dark mode automatically via theme
- [ ] Include `testID` prop for testing
- [ ] Add accessibility props (`accessibilityLabel`, `accessibilityRole`)
- [ ] Support responsive behavior via `useDimensions()` if applicable
- [ ] Platform-specific optimizations where needed
- [ ] Static styles in `StyleSheet.create()`
- [ ] Theme-dependent styles as inline

### Export Pattern

**In `components/ui/index.ts` or `components/navigation/index.ts`:**
```tsx
export { MyComponent } from './my-component';
export type { MyComponentProps } from './my-component';
```

**In `components/index.ts`:**
```tsx
export * from './ui';
export * from './navigation';
```

---

## Testing Strategy

### Unit Tests

Location: `zero-to-app/utils/__tests__/`

```tsx
import { hasContrastRatio } from '../contrast-checker';

describe('hasContrastRatio', () => {
  it('should pass WCAG AA for sufficient contrast', () => {
    expect(hasContrastRatio('#000000', '#FFFFFF', 'AA')).toBe(true);
  });
});
```

### Storybook Stories

Location: `apps/storybook/components/ComponentName/ComponentName.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'zero-to-app';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text', 'tonal', 'elevated'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: {
    title: 'Filled Button',
    variant: 'filled',
    onPress: () => console.log('Pressed'),
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Button',
    variant: 'outlined',
    onPress: () => console.log('Pressed'),
  },
};
```

### Demo Integration

Location: `apps/demo/app/`

Use for components requiring expo-router or navigation context:

```tsx
// apps/demo/app/(tabs)/components.tsx
import { AppTabs } from 'zero-to-app';

export default function ComponentsScreen() {
  return <AppTabs />; // Uses expo-router context
}
```

---

## Build & Release

### Development Commands

```bash
# Install dependencies
pnpm install

# Type checking (entire monorepo)
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix

# Build library package
pnpm build  # Builds zero-to-app/dist/

# Build demo app (web export)
pnpm build:demo
```

### Build Configuration

**TypeScript Build:** `zero-to-app/tsconfig.build.json`
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true
  },
  "exclude": ["**/*.test.ts", "**/*.test.tsx", "dist", "node_modules"]
}
```

**Build Script:** `zero-to-app/package.json`
```json
{
  "scripts": {
    "build": "pnpm exec tsc -p tsconfig.build.json"
  }
}
```

### Publishing

```bash
# Build and publish to npm
pnpm release

# This runs:
# 1. pnpm run build (builds zero-to-app package)
# 2. pnpm --filter zero-to-app publish --access public --no-git-checks
```

**CI/CD:** GitHub Actions workflow at `.github/workflows/ci.yml`
- Runs on push to `main` and PRs
- Steps: lint → typecheck → build → deploy demo

---

## Code Style & Patterns

### TypeScript Patterns

**Prefer Named Exports for Types:**
```tsx
// ✅ Good
export type { ButtonProps, ButtonVariant } from './button';

// ❌ Avoid default exports for types
export type { default as ButtonPropsType } from './button';
```

**Use Type Inference:**
```tsx
// ✅ Good - infer from theme tokens
const tokens = theme.tokens.button;

// ❌ Avoid - unnecessary type annotation
const tokens: ThemeTokens['button'] = theme.tokens.button;
```

**Discriminated Unions:**
```tsx
type ButtonVariant = 'filled' | 'outlined' | 'text';

interface ButtonProps {
  variant?: ButtonVariant;
}
```

### React Patterns

**Hooks at Top Level:**
```tsx
// ✅ Good
function MyComponent() {
  const { values: theme } = useTheme();
  const brand = useBrand();

  return <View />;
}

// ❌ Bad - conditional hooks
function MyComponent({ showTheme }) {
  if (showTheme) {
    const theme = useTheme(); // ❌ Violates rules of hooks
  }
  return <View />;
}
```

**Memoization:**
```tsx
import { useMemo } from 'react';

function MyComponent({ items }: { items: Item[] }) {
  const sortedItems = useMemo(
    () => items.sort((a, b) => a.priority - b.priority),
    [items]
  );

  return <View>{/* render sortedItems */}</View>;
}
```

### Platform-Specific Code

**Platform Detection:**
```tsx
import { Platform } from 'react-native';

function MyComponent() {
  const isWeb = Platform.OS === 'web';
  const isIOS = Platform.OS === 'ios';

  return (
    <View style={{
      // Platform-specific styles
      ...(Platform.OS === 'ios' && { paddingTop: 20 }),
      ...(Platform.OS === 'android' && { elevation: 4 }),
    }}>
      {Platform.select({
        ios: <IOSComponent />,
        android: <AndroidComponent />,
        web: <WebComponent />,
      })}
    </View>
  );
}
```

**Platform Files:**
```
button.tsx       # Shared implementation
button.web.tsx   # Web-specific override
button.ios.tsx   # iOS-specific override
```

---

## Contribution Checklist

### Before Creating a PR

- [ ] Run `pnpm typecheck` - must pass with no errors
- [ ] Run `pnpm lint` - fix all linting errors
- [ ] Test in Storybook (if isolated component)
- [ ] Test in Demo app (if integrated component)
- [ ] Add/update Storybook stories for new components
- [ ] Update component exports in index files
- [ ] Add JSDoc comments to all public APIs
- [ ] Test on iOS, Android, and Web (if applicable)
- [ ] Update README.md with new components/APIs
- [ ] Verify light and dark mode appearance

### Documentation Requirements

**Component Props:**
- JSDoc description for every prop
- `@default` annotation for default values
- Usage examples in JSDoc `@example` blocks

**New Tokens:**
- Add to theme-config.ts with types
- Document in README.md M3 tokens section
- Show usage examples

**Breaking Changes:**
- Document migration path
- Update version in package.json (major bump)
- Add migration guide to PR description

### Accessibility Standards

- [ ] Meaningful `accessibilityLabel` for interactive elements
- [ ] Correct `accessibilityRole` (button, link, etc.)
- [ ] `accessibilityState` for toggles/selections
- [ ] Keyboard navigation support (web)
- [ ] Screen reader tested (iOS VoiceOver, Android TalkBack)
- [ ] Focus indicators visible (web)
- [ ] Touch target minimum 44x44dp (mobile)

---

## Common Patterns

### Responsive Components

```tsx
import { useDimensions, breakpoints } from 'zero-to-app';

function ResponsiveCard() {
  const { width } = useDimensions();
  const isDesktop = width >= breakpoints.large;
  const brand = useBrand();

  return (
    <View style={{
      padding: isDesktop ? brand.spacing.xxxl : brand.spacing.xl,
      flexDirection: isDesktop ? 'row' : 'column',
    }}>
      {/* Content */}
    </View>
  );
}
```

### Icon Rendering

```tsx
import { renderIcon } from '../../utils/icon-utils';

function IconButton({ iconName }: { iconName: string }) {
  const { values: theme } = useTheme();

  return (
    <Pressable>
      {renderIcon(
        { name: iconName, size: 24 },
        'Feather',
        24,
        theme.onSurface
      )}
    </Pressable>
  );
}
```

### Theme-Aware Styling

```tsx
function ThemedCard() {
  const { values: theme } = useTheme();
  const brand = useBrand();

  return (
    <View
      style={{
        backgroundColor: theme.tokens.card.background,
        borderColor: theme.outlineVariant,
        borderWidth: 1,
        borderRadius: brand.borderRadius,
        padding: brand.spacing.lg,
      }}
    >
      <Text style={{ color: theme.tokens.card.text }}>
        Card Content
      </Text>
    </View>
  );
}
```

---

## Troubleshooting

### TypeScript Errors

**Error:** `Property 'tokens' does not exist on type 'ThemeValuesType'`
- **Fix:** Ensure theme-config.ts defines tokens and both light/dark themes populate them

**Error:** `Cannot find module 'zero-to-app'`
- **Fix:** Run `pnpm build` in zero-to-app/ directory
- **Check:** package.json exports map includes the path

### Build Errors

**Error:** `tsc: command not found`
- **Fix:** Run `pnpm install` at monorepo root

**Error:** Build succeeds but types not generated
- **Fix:** Add `"declaration": true` to tsconfig.build.json

### Storybook Issues

**Error:** Component renders but no theme
- **Fix:** Check `.storybook/decorators.tsx` wraps stories with `<ZeroToApp>`

**Error:** expo-router component fails in Storybook
- **Expected:** Use demo app instead (see "Development Workflow")

---

## Quick Reference

### File Locations
| Purpose | Path |
|---------|------|
| Component exports | `zero-to-app/index.ts` |
| Theme configuration | `zero-to-app/theme/theme-config.ts` |
| Brand creation | `zero-to-app/brand/brand-config.ts` |
| UI components | `zero-to-app/components/ui/` |
| Navigation components | `zero-to-app/components/navigation/` |
| Storybook stories | `apps/storybook/components/` |
| Demo app | `apps/demo/app/` |

### Commands
| Task | Command |
|------|---------|
| Install | `pnpm install` |
| Storybook (web) | `pnpm dev:storybook:web` |
| Storybook (native) | `pnpm dev:storybook` |
| Demo app | `pnpm dev:demo` |
| Build library | `pnpm build` |
| Type check | `pnpm typecheck` |
| Lint | `pnpm lint` |
| Publish | `pnpm release` |

### Key Exports
| Export | Location | Purpose |
|--------|----------|---------|
| `ZeroToApp` | `theme/index.ts` | Theme provider wrapper |
| `createBrand` | `brand/index.ts` | Brand configuration creator |
| `useTheme` | `theme/index.ts` | Access theme tokens |
| `useBrand` | `brand/index.ts` | Access brand config |
| `useDimensions` | `hooks/index.ts` | Responsive dimensions |
| `Button` | `components/ui/index.ts` | M3 button component |
| `Typography` | `components/ui/index.ts` | M3 typography component |
| `AppTabs` | `components/navigation/index.ts` | Native tab navigation |
