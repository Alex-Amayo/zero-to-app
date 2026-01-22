# zero-to-app

A React Native design system with a CLI tool to install and use components in your projects.

## Repository Structure

This is a monorepo managed with pnpm workspaces, containing three main parts:

### 📦 `package/`

The core design system package - React Native components, theme system, and utilities. This is the package that gets installed into projects via the CLI.

See [`package/README.md`](package/README.md) for complete documentation.

### 🛠️ `cli/`

The CLI tool that downloads and installs the design system into your project.

```bash
npx zero-to-app
```

See [`cli/README.md`](cli/README.md) for CLI usage and options.

### 🎨 `apps/demo/`

A demo Expo application showcasing the design system components. This serves as both a development environment and a component showcase.

See [`apps/demo/README.md`](apps/demo/README.md) for demo app details.

## Development

### Setup

```bash
# Install dependencies
pnpm install
```

### Run Demo App

```bash
# Start the demo app
pnpm dev
# or
cd apps/demo && pnpm start
```

### Build CLI

```bash
pnpm build:cli
```

## Quick Start (For Users)

Install the design system into your project:

```bash
npx zero-to-app
```

This downloads the latest `package/` directory from this repository and installs it into `./zero-to-app/` in your project.

## License

MIT
