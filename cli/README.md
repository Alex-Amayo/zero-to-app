# zero-to-app CLI

CLI tool to install the zero-to-app design system package into your project.

## Installation

You can use the CLI directly with npx (no installation needed):

```bash
npx zero-to-app
```

Or install it globally:

```bash
npm install -g zero-to-app
```

Then run:

```bash
zero-to-app
```

## Usage

```bash
zero-to-app [options]
```

### Options

- `-f, --force` - Overwrite existing directory if it exists
- `--skip-install` - Skip dependency installation
- `-p, --package-manager <manager>` - Specify package manager (npm, yarn, pnpm). Default: auto-detect
- `-h, --help` - Display help
- `-V, --version` - Display version

### Examples

```bash
# Install to ./zero-to-app directory
npx zero-to-app

# Force overwrite existing directory
npx zero-to-app --force

# Skip dependency installation
npx zero-to-app --skip-install

# Use specific package manager
npx zero-to-app --package-manager yarn
```

## What it does

1. Copies all files from the zero-to-app package to `./zero-to-app` in your current directory
2. Checks your project's `package.json` for required dependencies
3. Installs only missing dependencies in your project root (not in zero-to-app/)
4. Uses `npx expo install` for Expo packages and npm/yarn/pnpm for regular packages

### Required Dependencies

The CLI checks for and installs these dependencies if missing:
- `react-hook-form` - Form validation
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `react-native-reanimated-carousel` - Carousel component
- `expo-blur` - Blur effects
- `expo-glass-effect` - Glass effect

**Note:** If all dependencies are already present in your `package.json`, the CLI will skip installation.

## Development

```bash
# Install dependencies
npm install

# Build (bundles package files)
npm run build

# Run tests
npm test

# Link locally for testing
npm link
```

### Building

Before publishing or testing locally, run the build script to bundle the package files:

```bash
npm run build
```

This copies the package files from `../package` into `package-files/` directory, which gets included when the CLI is published to npm.

## Testing

```bash
npm test
```

## Publishing

Before publishing, ensure the package files are included. The CLI expects the package directory to be available at `../package` relative to the CLI package root.

