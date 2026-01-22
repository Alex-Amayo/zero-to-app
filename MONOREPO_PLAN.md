# Monorepo Implementation Plan: Metro + React Native

## 🎯 Goal
Set up a monorepo where:
- **Development**: `apps/demo` imports directly from `package/` (no GitHub download needed)
- **Distribution**: CLI still copies `package/` files to end users (unchanged behavior)
- **Metro**: Properly resolves and watches `package/` directory

---

## ⚠️ Metro Challenges & Solutions

### Challenge 1: Metro Doesn't Watch Outside App Directory
**Problem**: Metro by default only watches files in `apps/demo/` and its `node_modules/`.

**Solution**: Configure `watchFolders` to include the monorepo root and `package/` directory.

### Challenge 2: Module Resolution Outside App
**Problem**: Metro can't resolve `import { Button } from 'zero-to-app'` if the package isn't in `node_modules/`.

**Solution**: 
- Use npm/pnpm workspaces to create a symlink in `apps/demo/node_modules/zero-to-app`
- Configure Metro's `resolver.nodeModulesPaths` to look in root `node_modules/`
- Use `extraNodeModules` as fallback

### Challenge 3: Symlink Issues (especially with pnpm)
**Problem**: pnpm uses hard links/symlinks that Metro sometimes struggles with.

**Solution**: 
- Use **npm workspaces** (simpler, better Metro support) OR
- Use **pnpm with `node-linker=hoisted`** (puts more in root `node_modules/`)

### Challenge 4: Duplicate React/React Native Instances
**Problem**: If `package/` has its own `react` dependency, Metro might load duplicates → "Hooks invariant violated".

**Solution**: 
- Make `react` and `react-native` **peerDependencies** in `package/package.json`
- Install them only at root level
- Use `resolver.disableHierarchicalLookup = true` to prevent Metro from looking too far up

### Challenge 5: TypeScript Path Resolution
**Problem**: `tsconfig.json` paths don't automatically work in Metro.

**Solution**: 
- Use `babel-plugin-module-resolver` OR
- Configure Metro's `resolver.extraNodeModules` to map `zero-to-app` → `../../package`

---

## 📋 Implementation Steps

### Step 1: Create Root `package.json` with Workspaces

```json
{
  "name": "zero-to-app-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "package",
    "apps/*",
    "cli"
  ],
  "scripts": {
    "dev": "cd apps/demo && npm start",
    "build:cli": "cd cli && npm run build",
    "test": "npm run test --workspaces"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**Why**: This tells npm/pnpm to:
- Link `package/` as a workspace
- Make it available to `apps/demo` via symlink
- Hoist shared dependencies to root

### Step 2: Create `package/package.json`

```json
{
  "name": "zero-to-app",
  "version": "1.0.0",
  "main": "index.ts",
  "types": "index.ts",
  "exports": {
    ".": "./index.ts",
    "./package.json": "./package.json"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-native": ">=0.70.0",
    "@expo/vector-icons": "*"
  },
  "peerDependenciesMeta": {
    "@expo/vector-icons": {
      "optional": true
    }
  },
  "dependencies": {
    "react-hook-form": "^7.0.0",
    "@hookform/resolvers": "^3.0.0",
    "zod": "^3.22.0",
    "react-native-reanimated-carousel": "^3.5.0",
    "expo-blur": "*",
    "expo-glass-effect": "*"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-native": "^0.70.0"
  }
}
```

**Key points**:
- `peerDependencies` for `react`/`react-native` (prevents duplicates)
- Regular `dependencies` for design system deps
- `exports` field for modern module resolution

### Step 3: Update `apps/demo/package.json`

Add workspace dependency:

```json
{
  "dependencies": {
    "zero-to-app": "*"  // This will resolve to workspace package
  }
}
```

**Why**: `"*"` tells npm/pnpm to use the workspace version, not download from npm.

### Step 4: Configure Metro (`apps/demo/metro.config.js`)

```javascript
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo
config.watchFolders = [monorepoRoot];

// Resolve node_modules from both app and root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Disable hierarchical lookup to prevent Metro from looking too far up
// This prevents duplicate module resolution
config.resolver.disableHierarchicalLookup = true;

// Map 'zero-to-app' to the package directory (fallback if workspace linking fails)
config.resolver.extraNodeModules = {
  'zero-to-app': path.resolve(monorepoRoot, 'package'),
};

module.exports = config;
```

**Why each setting**:
- `watchFolders`: Metro watches `package/` for changes → hot reload works
- `nodeModulesPaths`: Metro finds dependencies in root `node_modules/`
- `disableHierarchicalLookup`: Prevents Metro from looking too far up the tree
- `extraNodeModules`: Fallback if workspace symlink doesn't work

### Step 5: Update TypeScript Configs

**`apps/demo/tsconfig.json`**:
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "zero-to-app": ["../../package"],
      "zero-to-app/*": ["../../package/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "../../package/**/*.ts",
    "../../package/**/*.tsx"
  ]
}
```

**`package/tsconfig.json`** (new file):
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "lib": ["esnext"],
    "jsx": "react-native",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node"
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Step 6: Update Demo App to Use Package

**`apps/demo/app/_layout.tsx`**:
```typescript
import { ZeroToApp, createBrand } from 'zero-to-app';
// ... rest of imports

export default function RootLayout() {
  const brand = createBrand({
    name: 'Demo App',
    colors: {
      primary: '#cc3366',
      secondary: '#cc3366',
      backgroundColor: '#fafafc',
    },
    // ... rest of brand config
  });

  return (
    <ZeroToApp brand={brand}>
      {/* existing layout */}
    </ZeroToApp>
  );
}
```

### Step 7: Install Dependencies

```bash
# From root
npm install

# This will:
# 1. Install all dependencies at root level (hoisted)
# 2. Create symlink: apps/demo/node_modules/zero-to-app -> ../../package
# 3. Install package dependencies
```

### Step 8: Test Development Workflow

```bash
# Start demo app
npm run dev

# Make changes to package/ui/button/Button.tsx
# Metro should hot reload automatically
```

---

## 🔄 CLI Behavior (Unchanged)

The CLI still works the same way:
1. Downloads `package/` from GitHub
2. Copies to user's `./zero-to-app/` directory
3. Installs dependencies

**No changes needed** - CLI doesn't need to know about workspaces.

---

## 🧪 Testing Strategy

### Test 1: Local Development
```bash
# 1. Make change to package/ui/button/Button.tsx
# 2. Save file
# 3. Metro should detect change and hot reload
# 4. Demo app should show updated button
```

### Test 2: Workspace Resolution
```bash
# In apps/demo/app/index.tsx
import { Button } from 'zero-to-app';
# Should resolve to ../../package, not node_modules
```

### Test 3: CLI Still Works
```bash
# In a separate project
npx zero-to-app
# Should download and copy package/ from GitHub
```

---

## ⚖️ Trade-offs

### ✅ Advantages
- **Fast local dev**: No need to push to GitHub to test changes
- **Hot reload works**: Metro watches `package/` → instant feedback
- **Type safety**: TypeScript resolves across workspace
- **Single source of truth**: One `package/` directory
- **Version alignment**: Shared `react`/`react-native` versions

### ⚠️ Complexity Added
- **Metro config**: More complex, but well-documented
- **Initial setup**: ~30 minutes to configure
- **Dependency management**: Need to understand workspaces
- **CI/CD**: May need updates to handle workspaces

### 🚫 Not Suitable If
- Team doesn't understand monorepos
- You want absolute simplicity
- You're shipping MVP in < 1 week

---

## 🎯 Recommendation

**For MVP**: This is worth it if:
- You'll iterate on components frequently
- Demo app needs to showcase latest changes
- You have 2-4 hours to set up and test

**Alternative (Simpler)**: 
- Keep current structure
- Use `npm link` or `yalc` for local testing
- Less setup, but manual linking step required

---

## 📚 Additional Resources

- [Expo Monorepo Guide](https://docs.expo.dev/guides/monorepos/)
- [Metro Configuration](https://metrobundler.dev/docs/configuration)
- [npm Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces)
- [pnpm Workspaces](https://pnpm.io/workspaces)

---

## 🚀 Next Steps

1. Review this plan
2. Decide: npm workspaces vs pnpm
3. Implement Step 1-7
4. Test thoroughly
5. Update CI/CD if needed
