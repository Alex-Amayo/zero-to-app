# Copilot / AI Agent Instructions — zero-to-app

Keep guidance short, specific, and code-focused. This file highlights patterns, commands, and files an AI coding agent should know to be immediately productive in this monorepo.

- **Repo structure (big picture)**: This is a pnpm monorepo. The publishable package is `zero-to-app/` (the design system). App examples live in `apps/storybook/` and `apps/demo/`.

- **Primary entrypoints**: `zero-to-app/index.ts` (exports public API), `zero-to-app/README.md` (component docs).

- **Key directories to read first**:
  - `zero-to-app/` — core library source, types, and themes.
  - `zero-to-app/components/ui/` — primary UI components (e.g. `Button.tsx`, `Typography.tsx`).
  - `zero-to-app/theme/` — theme creators and `themeConfig.ts` (semantic tokens).
  - `zero-to-app/brand/` — brand helpers (`createBrand`, palette generation).
  - `apps/storybook/` and `apps/demo/` — live component examples and usage patterns.

- **Theme & token conventions** (must follow these exactly):
  - Prefer Material 3 palette roles exposed on `brand.colors` (eg. `primary`, `onPrimary`, `surface`, `onSurface`). See `zero-to-app/.cursorrules` for the full checklist.
  - Use semantic tokens from `theme.values.tokens.*` (e.g. `tokens.button.primaryBg`, `tokens.typography.title`) rather than ad-hoc color values.
  - Access theme in components with `useTheme()`; access raw brand config with `useBrand()`.
  - When adding tokens, update `theme/themeConfig.ts`, `ThemeValuesType`, and populate both light/dark creators.

- **Patterns & APIs to use**:
  - Provider: `ZeroToApp` wrapper consumes `createBrand(...)` — changes here affect the whole system.
  - Hooks: `useDimensions`, `useWindowWidth/Height` are the canonical responsive utilities.
  - Components: prefer exported primitives in `zero-to-app/components/*` and `zero-to-app/components/ui/*`.

- **Build / dev / test commands** (use pnpm):
  - Install: `pnpm install`
  - Storybook (native): `pnpm dev:storybook`
  - Storybook (web): `pnpm dev:storybook:web`
  - Demo app: `pnpm dev:demo`
  - Build library: `pnpm build`
  - Lint: `pnpm lint` and `pnpm lint:fix`
  - Typecheck: `pnpm typecheck`
  - Tests: repository has unit tests under `zero-to-app/__tests__` and `zero-to-app/utils/__tests__` — run via the repo test script if present.

- **CI / release notes**:
  - Releases/publishing done via `pnpm release` and GitHub Actions. See top-level `README.md` for required secrets (`EXPO_TOKEN`, `NPM_TOKEN`).

- **Project-specific conventions (non-obvious)**:
  - Do not introduce legacy token names (eg. `backgroundColor`, `buttonText`) — only add M3 roles or documented semantic tokens.
  - Centralize theme derivation: modify `createLightTheme` / `createDarkTheme` rather than scattering palette math through components.
  - Add cross-cutting tokens to `tokens` (not component-local constants) so changes propagate through Storybook/demo.
  - Keep types in sync: when adding a token or brand field update TypeScript types immediately (`ThemeValuesType`, brand types in `brand/`).

- **Examples to reference when making changes**:
  - Theme token usage: `zero-to-app/components/ui/Button.tsx` (how components consume `useTheme()` and `tokens`).
  - Theme rules and checklist: `zero-to-app/.cursorrules`.
  - Tests referencing contrast/token logic: `zero-to-app/theme/theme.test.tsx` and `zero-to-app/utils/__tests__/contrastChecker.test.ts`.

- **When editing code**:
  - Prefer minimal, focused changes and update types + tests in the same PR.
  - Run `pnpm lint` and `pnpm typecheck` locally; CI will run the same checks.
  - If you add tokens, update `README.md` in `zero-to-app/` with usage examples.

- **If uncertain**:
  - Open Storybook (`pnpm dev:storybook:web`) or the demo (`pnpm dev:demo:web`) to see the runtime effect of visual changes.
  - For publishing/publishing-related work consult `package.json` scripts in both repo root and `zero-to-app/package.json`.

If anything here is unclear or you want additional examples (code snippets or commands), tell me which area to expand. 
