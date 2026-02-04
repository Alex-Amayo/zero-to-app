import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { Typography, Button, Screen, useDimensions, breakpoints } from 'zero-to-app';
import { DemoSection } from '../../components/demo-section';
import { PropsTable, type PropDefinition } from '../../components/props-table';

const buttonProps: PropDefinition[] = [
  {
    name: 'title',
    type: 'string',
    description: 'Button label text',
  },
  {
    name: 'variant',
    type: "'filled' | 'elevated' | 'tonal' | 'outlined' | 'text'",
    default: "'filled'",
    description: 'Visual style variant following M3 button spec',
  },
  {
    name: 'size',
    type: "'xs' | 's' | 'm' | 'l' | 'xl'",
    default: "'s'",
    description: 'Button size affecting height (32/40/56/96/136dp)',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    description: 'Optional icon configuration with library, name, size, color',
  },
  {
    name: 'iconPosition',
    type: "'left' | 'right'",
    default: "'right'",
    description: 'Position of the icon relative to the title',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Shows a loading spinner and disables interaction',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the button interaction',
  },
  {
    name: 'onPress',
    type: '(event?: GestureResponderEvent) => void',
    description: 'Press handler callback',
  },
  {
    name: 'color',
    type: 'string',
    description: 'Override text color (use sparingly)',
  },
  {
    name: 'backgroundColor',
    type: 'string',
    description: 'Override background color (use sparingly)',
  },
];

export default function ButtonPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useDimensions();
  const isDesktop = width >= breakpoints.large;

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Screen scrollable variant="background" edges={Platform.OS === 'web' || isDesktop ? ['top', 'bottom'] : ['bottom']}>
      <View style={styles.container}>
        <Typography variant="headlineMedium" weight="bold">
          Button
        </Typography>
        <Typography variant="bodyMedium" muted style={styles.description}>
          Material Design 3 Button component with five variants for different emphasis levels.
        </Typography>

        <DemoSection
          title="Variants"
          description="Five button variants for different emphasis levels"
        >
          <View style={styles.row}>
            <Button title="Filled" variant="filled" onPress={() => {}} />
            <Button title="Elevated" variant="elevated" onPress={() => {}} />
            <Button title="Tonal" variant="tonal" onPress={() => {}} />
          </View>
          <View style={styles.row}>
            <Button title="Outlined" variant="outlined" onPress={() => {}} />
            <Button title="Text" variant="text" onPress={() => {}} />
          </View>
        </DemoSection>

        <DemoSection
          title="Sizes"
          description="Five size options from extra small to extra large"
        >
          <View style={styles.row}>
            <Button title="XS" size="xs" variant="tonal" onPress={() => {}} />
            <Button title="S (default)" size="s" variant="tonal" onPress={() => {}} />
            <Button title="M" size="m" variant="tonal" onPress={() => {}} />
          </View>
          <View style={styles.row}>
            <Button title="Large" size="l" variant="tonal" onPress={() => {}} />
            <Button title="Extra Large" size="xl" variant="tonal" onPress={() => {}} />
          </View>
        </DemoSection>

        <DemoSection
          title="With Icons"
          description="Icons can be positioned on the left or right of the label"
        >
          <View style={styles.row}>
            <Button
              title="Continue"
              icon={{ library: 'Feather', name: 'arrow-right' }}
              iconPosition="right"
              onPress={() => {}}
            />
            <Button
              title="Back"
              icon={{ library: 'Feather', name: 'arrow-left' }}
              iconPosition="left"
              variant="outlined"
              onPress={() => {}}
            />
          </View>
          <View style={styles.row}>
            <Button
              title="Settings"
              icon={{ library: 'Feather', name: 'settings' }}
              iconPosition="left"
              variant="tonal"
              onPress={() => {}}
            />
            <Button
              title="Download"
              icon={{ library: 'Feather', name: 'download' }}
              iconPosition="right"
              variant="elevated"
              onPress={() => {}}
            />
          </View>
        </DemoSection>

        <DemoSection
          title="Loading State"
          description="Shows a spinner and disables interaction while loading"
        >
          <View style={styles.row}>
            <Button
              title={isLoading ? 'Loading...' : 'Click to load'}
              loading={isLoading}
              onPress={handleLoadingDemo}
            />
            <Button title="Always loading" loading={true} variant="tonal" />
          </View>
        </DemoSection>

        <DemoSection
          title="Disabled State"
          description="Disabled buttons are non-interactive with reduced opacity"
        >
          <View style={styles.row}>
            <Button title="Disabled Filled" disabled onPress={() => {}} />
            <Button title="Disabled Outlined" variant="outlined" disabled onPress={() => {}} />
            <Button title="Disabled Tonal" variant="tonal" disabled onPress={() => {}} />
          </View>
        </DemoSection>

        <Typography variant="titleLarge" weight="medium" style={styles.propsTitle}>
          Props
        </Typography>
        <PropsTable props={buttonProps} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },
  description: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  propsTitle: {
    marginTop: 16,
  },
});
