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

1. Downloads the `package/` directory from [https://github.com/Alex-Amayo/zero-to-app](https://github.com/Alex-Amayo/zero-to-app) (master branch)
2. Copies all files from the downloaded package to `./zero-to-app` in your current directory
3. Checks your project's `package.json` for required dependencies
4. Installs only missing dependencies in your project root (not in zero-to-app/)
5. Uses `npx expo install` for Expo packages and npm/yarn/pnpm for regular packages

### How it gets the package files

The CLI always downloads from GitHub:
- **GitHub source**: Always fetches from the official repository at `Alex-Amayo/zero-to-app` on the `master` branch
- **Caching**: Downloads are cached locally for faster subsequent runs
- **Requirements**: Requires git and internet connection

### Required Dependencies

The CLI checks for and installs these dependencies if missing:
- `react-hook-form` - Form validation
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `react-native-reanimated-carousel` - Carousel component
- `@shopify/flash-list` - High-performance list component
- `lottie-react-native` - Lottie animations
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


## Testing

```bash
npm test
```

## Publishing

The CLI automatically downloads package files from GitHub when used. No build step is required before publishing.

Simply publish to npm:
```bash
npm publish
```

The CLI will fetch the latest package files from GitHub when users run it.

