---
description: Use when developing, building, or testing components for the zero-to-app library
---

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
- **Storybook:** Isolated UI (Button, Typography, Card, Input, FAB, Collapsible)
- **Demo App:** Navigation, expo-router components, native features

---

## Repository Structure

```
zero-to-app/
├── zero-to-app/           # npm package
│   ├── components/ui/     # UI components
│   ├── components/navigation/  # Nav components
│   ├── theme/             # Theme system
│   ├── hooks/             # Custom hooks (useDimensions, useBreakpoint, useRouteNavigation)
│   ├── context/           # Context providers (sidebar, layout, scroll)
│   ├── brand/             # Brand configuration
│   ├── icons/             # Icon rendering
│   └── index.ts           # Public exports
├── apps/storybook/        # Component stories
└── apps/demo/             # Demo app
    └── src/
        ├── app/explore/   # Docs pages (use DocsPage wrapper)
        ├── components/
        │   ├── docs-page.tsx      # Page wrapper (NativeHeader + Screen + title/desc)
        │   ├── docs-pagination.tsx # Prev/Next nav (driven by NAV_PAGES)
        │   ├── demo-section.tsx
        │   └── props-table.tsx
        └── config/
            └── nav.ts     # NAV_SECTIONS + NAV_PAGES — single source of truth for sidebar/pagination
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

## Key Files

| Purpose | Path |
|---------|------|
| Public exports | `zero-to-app/index.ts` |
| Theme config | `zero-to-app/theme/theme-config.ts` |
| Brand creation | `zero-to-app/brand/brand-config.ts` |
| UI components | `zero-to-app/components/ui/` |
| Nav components | `zero-to-app/components/navigation/` |
| Hooks | `zero-to-app/hooks/` |
| Contexts | `zero-to-app/context/` |

---

## Demo App Patterns

### Adding a new docs page
1. Create `apps/demo/src/app/explore/my-page.tsx` using `DocsPage`:
   ```tsx
   import { DocsPage } from '../../components/docs-page';
   import { DocsPagination } from '../../components/docs-pagination';

   export default function MyPage() {
     return (
       <DocsPage title="My Component" description="Short description.">
         <DemoSection title="Usage" ...>...</DemoSection>
         <PropsTable props={myProps} />
         <DocsPagination />
       </DocsPage>
     );
   }
   ```
2. Add to `apps/demo/src/config/nav.ts` in `NAV_SECTIONS` — sidebar and pagination update automatically.
3. Add a `<Stack.Screen>` entry in `explore/_layout.ios.tsx`.

### DocsPage props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Page headline |
| `description` | `string` | — | Subtitle below headline |
| `sidebarIcon` | `'left' \| 'right'` | `'left'` | SF Symbol side for iOS native header |
| `children` | `ReactNode` | — | Page content |

### Nav config (`config/nav.ts`)
- `NAV_SECTIONS` — drives both `_layout.tsx` and `_layout.ios.tsx` sidebar rendering
- `NAV_PAGES` — flat array used by `DocsPagination` for prev/next links
- Add `exact: true` on a nav item when its route is a prefix of other routes (e.g. `/explore`)

---

## Adding Theme Tokens

1. Add to `ThemeValuesType` in `theme/theme-config.ts`
2. Populate in `createLightTheme()` and `createDarkTheme()`

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
