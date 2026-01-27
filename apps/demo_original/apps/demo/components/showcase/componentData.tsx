import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Typography } from 'zero-to-app';

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
  preview: () => React.ReactNode;
}

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface ComponentData {
  name: string;
  category: string;
  description: string;
  import: string;
  examples: ComponentExample[];
  props: PropDefinition[];
}

export const componentData: ComponentData[] = [
  {
    name: 'Button',
    category: 'UI Primitive',
    description: 'A versatile button component with multiple variants, loading states, and icon support.',
    import: "import { Button } from 'zero-to-app';",
    examples: [
      {
        title: 'Primary',
        description: 'Default primary button style',
        code: '<Button title="Click Me" onPress={() => {}} />',
        preview: () => <Button title="Click Me" onPress={() => {}} />,
      },
      {
        title: 'Secondary',
        description: 'Secondary button with outline style',
        code: '<Button title="Secondary" secondary onPress={() => {}} />',
        preview: () => <Button title="Secondary" secondary onPress={() => {}} />,
      },
      {
        title: 'With Icon (Right)',
        description: 'Button with icon on the right side',
        code: `<Button 
  title="Save" 
  icon={{ library: "Feather", name: "save", size: 20 }}
  iconPosition="right"
  onPress={() => {}} 
/>`,
        preview: () => (
          <Button
            title="Save"
            icon={{ library: 'Feather', name: 'save', size: 20 }}
            iconPosition="right"
            onPress={() => {}}
          />
        ),
      },
      {
        title: 'With Icon (Left)',
        description: 'Button with icon on the left side',
        code: `<Button 
  title="Back" 
  icon={{ library: "Feather", name: "arrow-left", size: 20 }}
  iconPosition="left"
  onPress={() => {}} 
/>`,
        preview: () => (
          <Button
            title="Back"
            icon={{ library: 'Feather', name: 'arrow-left', size: 20 }}
            iconPosition="left"
            onPress={() => {}}
          />
        ),
      },
      {
        title: 'Loading',
        description: 'Button in loading state',
        code: '<Button title="Loading..." loading onPress={() => {}} />',
        preview: () => <Button title="Loading..." loading onPress={() => {}} />,
      },
    ],
    props: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: 'Button text label',
      },
      {
        name: 'onPress',
        type: '(event: GestureResponderEvent) => void',
        required: true,
        description: 'Press event handler function',
      },
      {
        name: 'secondary',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Use secondary style variant (outline)',
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Show loading indicator instead of button content',
      },
      {
        name: 'icon',
        type: '{ library: IconLibrary; name: string; size?: number; color?: string }',
        required: false,
        description: 'Icon configuration object',
      },
      {
        name: 'iconPosition',
        type: "'left' | 'right'",
        required: false,
        default: "'right'",
        description: 'Position of the icon relative to text',
      },
      {
        name: 'style',
        type: 'ViewStyle',
        required: false,
        description: 'Custom style overrides',
      },
    ],
  },
  {
    name: 'Typography',
    category: 'UI Primitive',
    description: 'Material Design 3 typography component with full type scale support, font weights, and line heights.',
    import: "import { Typography } from 'zero-to-app';",
    examples: [
      {
        title: 'Basic',
        description: 'Default body text',
        code: '<Typography>Hello World</Typography>',
        preview: () => <Typography>Hello World</Typography>,
      },
      {
        title: 'Bold',
        description: 'Bold text variant',
        code: '<Typography weight="bold">Bold Text</Typography>',
        preview: () => <Typography weight="bold">Bold Text</Typography>,
      },
      {
        title: 'Variants',
        description: 'Material Design 3 type scale',
        code: `<Typography variant="bodySmall">Small Body Text</Typography>
<Typography variant="bodyMedium">Medium Body Text</Typography>
<Typography variant="bodyLarge">Large Body Text</Typography>
<Typography variant="displaySmall">Display Text</Typography>`,
        preview: () => (
          <View style={styles.textSizesContainer}>
            <Typography variant="bodySmall">Small Body Text</Typography>
            <Typography variant="bodyMedium">Medium Body Text</Typography>
            <Typography variant="bodyLarge">Large Body Text</Typography>
            <Typography variant="displaySmall">Display Text</Typography>
          </View>
        ),
      },
      {
        title: 'Colors & Alignment',
        description: 'Custom colors and text alignment',
        code: `<Typography color="#ff5757">Colored Text</Typography>
<Typography align="center">Centered</Typography>
<Typography muted>Muted Text</Typography>`,
        preview: () => (
          <View style={styles.textVariantsContainer}>
            <Typography color="#ff5757">Colored Text</Typography>
            <Typography align="center">Centered</Typography>
            <Typography muted>Muted Text</Typography>
          </View>
        ),
      },
      {
        title: 'Uppercase',
        description: 'Uppercase text transformation',
        code: '<Typography uppercase>Uppercase Text</Typography>',
        preview: () => <Typography uppercase>Uppercase Text</Typography>,
      },
    ],
    props: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Text content to display',
      },
      {
        name: 'variant',
        type: 'TypographyVariant',
        required: false,
        default: "'bodyMedium'",
        description: 'M3 typography variant (displayLarge, headlineMedium, bodySmall, etc.)',
      },
      {
        name: 'weight',
        type: "'light' | 'regular' | 'medium' | 'bold' | number",
        required: false,
        default: "'regular'",
        description: 'Font weight',
      },
      {
        name: 'align',
        type: "'left' | 'center' | 'right' | 'justify'",
        required: false,
        default: "'left'",
        description: 'Text alignment',
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: 'Custom text color',
      },
      {
        name: 'uppercase',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Transform text to uppercase',
      },
      {
        name: 'numberOfLines',
        type: 'number',
        required: false,
        description: 'Limit the number of lines (truncates with ellipsis)',
      },
      {
        name: 'muted',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Use muted color from theme',
      },
      {
        name: 'style',
        type: 'TextStyle',
        required: false,
        description: 'Custom style overrides',
      },
    ],
  },
  // Card demos removed — demo uses simple Views instead of library Card component
];

const styles = StyleSheet.create({
  textSizesContainer: {
    gap: 8,
    alignItems: 'flex-start',
  },
  textVariantsContainer: {
    gap: 8,
    width: '100%',
  },
});
