# Verification Checklist

## 1. Verify File Structure

```bash
# Check root structure
ls -la | grep -E "^d" | grep -v node_modules

# Should see:
# - apps/
# - brand/
# - cli/
# - components/
# - context/
# - hooks/
# - theme/
# - ui/
```

## 2. Verify GitHub URLs

```bash
# Test registry URL (should return JSON)
curl https://raw.githubusercontent.com/Alex-Amayo/zero-to-app/clean-slate/cli/registry.json

# Test component URL (should return TypeScript)
curl https://raw.githubusercontent.com/Alex-Amayo/zero-to-app/clean-slate/ui/button/Button.tsx
```

## 3. Build and Test

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Type check
npm run type-check
```

## 4. Test CLI Locally

```bash
# Build first
npm run build

# Test CLI help
node dist/cli/index.js

# Test listing components (will fetch from GitHub)
node dist/cli/index.js install

# Test installing a component (in a test directory)
mkdir -p /tmp/test-cli
cd /tmp/test-cli
npm init -y
node /path/to/zero-to-app/dist/cli/index.js install button
```

## 5. Verify Showcase Path

```bash
# Check showcase exists in new location
ls -la apps/showcase/package.json

# Should exist and be valid JSON
cat apps/showcase/package.json | jq .
```

## 6. Verify GitHub Paths in Code

Check these files have correct paths:

- `cli/config.ts` - branch should be `clean-slate`
- `cli/utils.ts` - `loadRegistry()` should use `cli/registry.json`
- `cli/utils.ts` - `fetchComponentFile()` should use direct paths (no `zero-to-app/` prefix)
- `cli/__tests__/dependency-handling.test.ts` - showcase path should be `apps/showcase`

## 7. Test End-to-End

```bash
# In a fresh directory
cd /tmp
mkdir test-zero-to-app
cd test-zero-to-app
npm init -y

# Use npx to test (after publishing) or local path
npx zero-to-app install button

# Or test locally
node /path/to/zero-to-app/dist/cli/index.js install button

# Verify files were created
ls -la components/zero-to-app/ui/button/
```

## Expected Results

✅ All files at root level (not nested)
✅ Showcase in `apps/showcase/`
✅ CLI fetches from GitHub successfully
✅ Tests pass
✅ Build succeeds
✅ Components install correctly

