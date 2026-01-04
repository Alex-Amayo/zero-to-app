# Publishing zero-to-app CLI to npm

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup) if you don't have one
2. **Login to npm**: Run `npm login` in your terminal
3. **Check Package Name Availability**: The name `zero-to-app` might already be taken. Check at https://www.npmjs.com/package/zero-to-app

## Pre-Publishing Checklist

### 1. Update package.json

Before publishing, make sure to:
- Set the `author` field (currently empty)
- Verify the `version` number (currently `1.0.0`)
- Ensure `files` array includes all necessary files
- Check that `bin` entry points to the correct file

### 2. Build the Package

The `prepublishOnly` script will automatically run before publishing, but you can test it manually:

```bash
cd cli
npm run build
```

This bundles the package files from `../package` into `package-files/` directory.

### 3. Test Locally (Optional but Recommended)

Test the package locally before publishing:

```bash
# Link the package locally
npm link

# Test it in another directory
cd /path/to/test-project
npx zero-to-app
```

Or use `npm pack` to create a tarball and test it:

```bash
npm pack
# This creates zero-to-app-1.0.0.tgz
# You can test installing it: npm install ./zero-to-app-1.0.0.tgz
```

### 4. Verify Files to be Published

Check what files will be included:

```bash
npm pack --dry-run
```

This shows what files will be included in the package without creating the tarball.

## Publishing Steps

### Step 1: Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email address
- One-time password (if 2FA is enabled)

### Step 2: Check Package Name Availability

```bash
npm view zero-to-app
```

If the package exists, you'll see its details. If it doesn't exist, you'll get a 404 error (which is good - the name is available).

**If the name is taken**, you have two options:
1. Use a scoped package name: `@your-username/zero-to-app`
2. Choose a different name

To use a scoped package, update `package.json`:
```json
{
  "name": "@your-username/zero-to-app",
  ...
}
```

### Step 3: Build the Package

```bash
cd cli
npm run build
```

This ensures `package-files/` directory is up to date.

### Step 4: Publish

**For public package:**
```bash
npm publish
```

**For scoped package (private by default):**
```bash
npm publish --access public
```

**For dry run (test without publishing):**
```bash
npm publish --dry-run
```

### Step 5: Verify Publication

After publishing, verify it's available:

```bash
npm view zero-to-app
```

Or visit: https://www.npmjs.com/package/zero-to-app

## Post-Publishing

### Test Installation

Test that users can install and use it:

```bash
# In a new directory
npx zero-to-app
```

### Update Version for Future Releases

When you need to publish updates:

1. Update version in `package.json`:
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. Or manually edit `package.json` and then:
   ```bash
   npm publish
   ```

## Troubleshooting

### "Package name already exists"
- The name `zero-to-app` is already taken
- Use a scoped package: `@your-username/zero-to-app`
- Or choose a different name

### "You do not have permission to publish"
- Make sure you're logged in: `npm whoami`
- If using a scoped package, check the organization settings
- Verify you own the package name

### "Missing required field: author"
- Add author field to `package.json`:
  ```json
  {
    "author": "Your Name <your.email@example.com>"
  }
  ```

### Build fails
- Make sure the `../package` directory exists
- Check that `scripts/build.js` has proper permissions
- Verify all required files are present

## Package Configuration Summary

Current configuration:
- **Name**: `zero-to-app`
- **Version**: `1.0.0`
- **Files included**: `bin/`, `src/`, `package-files/`, `package.json`, `README.md`
- **Bin command**: `zero-to-app`
- **Auto-build**: Yes (via `prepublishOnly` script)

## Quick Reference

```bash
# 1. Login
npm login

# 2. Check name availability
npm view zero-to-app

# 3. Build (auto-runs before publish, but test it)
npm run build

# 4. Dry run
npm publish --dry-run

# 5. Publish
npm publish

# 6. Verify
npm view zero-to-app
```

