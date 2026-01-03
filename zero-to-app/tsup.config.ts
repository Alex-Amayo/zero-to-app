import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-native',
    '@expo/vector-icons',
    'react-hook-form',
    'expo-blur',
    'expo-router',
    'react-native-reanimated',
    'expo-glass-effect',
    'zod',
    '@hookform/resolvers',
  ],
});

