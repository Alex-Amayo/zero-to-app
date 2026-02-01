import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from 'zero-to-app';
import { Typography } from 'zero-to-app';

const meta = {
  title: 'Components/ThemedView',
  component: ThemedView,
  args: {
    variant: 'surface',
    color: undefined,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['surface', 'surfaceContainer', 'card', 'appbar', 'primary', 'background'],
    },
    color: { control: 'color' },
  },
  decorators: [(Story: any) => <View style={styles.container}><Story /></View>],
} as unknown as Meta<typeof ThemedView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <ThemedView {...args} style={styles.box}>
      <Typography variant="titleMedium">ThemedView ({args.variant})</Typography>
    </ThemedView>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={styles.row}>
      <ThemedView variant="surface" style={styles.gap}><Typography>Surface</Typography></ThemedView>
      <ThemedView variant="surfaceContainer" style={styles.gap}><Typography>SurfaceContainer</Typography></ThemedView>
      <ThemedView variant="card" style={styles.gap}><Typography>Card</Typography></ThemedView>
      <ThemedView variant="appbar" style={styles.gap}><Typography>Appbar</Typography></ThemedView>
      <ThemedView variant="primary" style={styles.gap}><Typography color='#FFFFFF'>Primary</Typography></ThemedView>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', justifyContent: 'center' },
  box: { padding: 16, borderRadius: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' },
  gap: { margin: 8, padding: 12, borderRadius: 8 },
});
