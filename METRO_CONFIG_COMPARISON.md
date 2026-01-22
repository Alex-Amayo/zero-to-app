# Metro Configuration Comparison for Monorepo

## Current Setup
- **Expo SDK**: 54.0.30
- **React Native**: 0.81.5
- **Metro**: Via `expo/metro-config`

## Expo SDK 52+ Auto-Detection

Expo SDK 52+ has **automatic monorepo detection**, but it may not handle all cases. Let's compare approaches:

---

## Option A: Minimal Config (Relies on Expo Auto-Detection)

```javascript
// apps/demo/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Expo SDK 52+ should auto-detect monorepo, but we can help it
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

config.watchFolders = [monorepoRoot];

module.exports = config;
```

**Pros**:
- Minimal configuration
- Expo handles most of the complexity

**Cons**:
- May not work reliably for all workspace setups
- Less control over resolution

**When to use**: If Expo auto-detection works for your setup.

---

## Option B: Full Manual Config (Recommended)

```javascript
// apps/demo/metro.config.js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch entire monorepo
config.watchFolders = [monorepoRoot];

// Resolve from both app and root node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Prevent Metro from looking too far up (avoids duplicate modules)
config.resolver.disableHierarchicalLookup = true;

// Explicit mapping for workspace package
config.resolver.extraNodeModules = {
  'zero-to-app': path.resolve(monorepoRoot, 'package'),
};

module.exports = config;
```

**Pros**:
- Explicit control
- Works reliably across different setups
- Handles edge cases

**Cons**:
- More verbose
- Need to maintain manually

**When to use**: When you need reliability and control.

---

## Option C: Using `babel-plugin-module-resolver`

```javascript
// apps/demo/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);
config.watchFolders = [path.resolve(__dirname, '../..')];

// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            'zero-to-app': '../../package',
          },
        },
      ],
    ],
  };
};
```

**Pros**:
- Works at Babel level (before Metro)
- Can handle complex aliases

**Cons**:
- Adds another dependency
- TypeScript paths still need separate config

**When to use**: If you need complex path aliases.

---

## Recommended: Option B (Full Manual Config)

For this project, **Option B** is recommended because:

1. **Reliability**: Explicit config works across npm/pnpm/yarn
2. **Debugging**: Easy to see what Metro is doing
3. **Control**: Can fine-tune resolution behavior
4. **Future-proof**: Works even if Expo changes auto-detection

---

## Common Issues & Solutions

### Issue 1: "Unable to resolve module 'zero-to-app'"

**Cause**: Metro can't find the workspace package.

**Solutions**:
1. Check `nodeModulesPaths` includes root
2. Verify `extraNodeModules` mapping is correct
3. Run `npm install` from root to create workspace symlink
4. Clear Metro cache: `expo start --clear`

### Issue 2: "Hooks invariant violated"

**Cause**: Multiple instances of React.

**Solutions**:
1. Make `react` a peerDependency in `package/package.json`
2. Use `disableHierarchicalLookup: true`
3. Ensure `react` is only installed at root level
4. Check `nodeModulesPaths` doesn't include too many locations

### Issue 3: Hot reload doesn't work for package files

**Cause**: Metro not watching `package/` directory.

**Solutions**:
1. Add `package/` to `watchFolders`
2. Ensure `watchFolders` includes monorepo root
3. Check file permissions
4. Restart Metro with `--clear` flag

### Issue 4: TypeScript errors but runtime works

**Cause**: TypeScript can't resolve workspace paths.

**Solutions**:
1. Update `tsconfig.json` with `paths` mapping
2. Include `package/` in `tsconfig.json` `include` array
3. Restart TypeScript server in IDE

### Issue 5: Works with npm but not pnpm

**Cause**: pnpm uses different symlink strategy.

**Solutions**:
1. Use `node-linker=hoisted` in `.npmrc` (puts more in root)
2. Or switch to npm workspaces (simpler for Metro)
3. Or use Option C with `babel-plugin-module-resolver`

---

## Testing Checklist

After implementing Metro config:

- [ ] `import { Button } from 'zero-to-app'` resolves correctly
- [ ] Changes to `package/ui/button/Button.tsx` trigger hot reload
- [ ] No "Hooks invariant violated" errors
- [ ] TypeScript autocomplete works for `zero-to-app` imports
- [ ] `npm run build` works (if you have build step)
- [ ] Works on both iOS and Android
- [ ] Works on web (if using Expo web)

---

## Performance Considerations

### Watch Folders Impact

Watching the entire monorepo can slow down Metro if:
- You have many files in root
- You have large `node_modules/` directories

**Optimization**:
```javascript
config.watchFolders = [
  path.resolve(monorepoRoot, 'package'),  // Only watch package, not entire monorepo
];
```

### Cache Performance

Metro cache can get confused with workspace symlinks.

**Solution**: Clear cache when changing workspace structure:
```bash
expo start --clear
```

---

## Migration Path

If you want to start simple and add complexity later:

1. **Week 1**: Use Option A (minimal), see if it works
2. **Week 2**: If issues arise, migrate to Option B
3. **Week 3**: Fine-tune based on actual usage

This lets you validate the monorepo setup before investing in complex config.
