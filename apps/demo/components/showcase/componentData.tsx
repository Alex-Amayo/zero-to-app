import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, StyledText, Card } from 'zero-to-app';

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
    name: 'StyledText',
    category: 'UI Primitive',
    description: 'A customizable text component with support for sizes, colors, alignment, and typography variants.',
    import: "import { StyledText } from 'zero-to-app';",
    examples: [
      {
        title: 'Basic',
        description: 'Default text styling',
        code: '<StyledText>Hello World</StyledText>',
        preview: () => <StyledText>Hello World</StyledText>,
      },
      {
        title: 'Bold',
        description: 'Bold text variant',
        code: '<StyledText bold>Bold Text</StyledText>',
        preview: () => <StyledText bold>Bold Text</StyledText>,
      },
      {
        title: 'Sizes',
        description: 'Different font sizes',
        code: `<StyledText fontSize="sm">Small</StyledText>
<StyledText fontSize="md">Medium</StyledText>
<StyledText fontSize="lg">Large</StyledText>
<StyledText fontSize="xl">Extra Large</StyledText>`,
        preview: () => (
          <View style={styles.textSizesContainer}>
            <StyledText fontSize="sm">Small</StyledText>
            <StyledText fontSize="md">Medium</StyledText>
            <StyledText fontSize="lg">Large</StyledText>
            <StyledText fontSize="xl">Extra Large</StyledText>
          </View>
        ),
      },
      {
        title: 'Colors & Alignment',
        description: 'Custom colors and text alignment',
        code: `<StyledText color="#ff5757">Colored Text</StyledText>
<StyledText align="center">Centered</StyledText>
<StyledText muted>Muted Text</StyledText>`,
        preview: () => (
          <View style={styles.textVariantsContainer}>
            <StyledText color="#ff5757">Colored Text</StyledText>
            <StyledText align="center">Centered</StyledText>
            <StyledText muted>Muted Text</StyledText>
          </View>
        ),
      },
      {
        title: 'Uppercase',
        description: 'Uppercase text transformation',
        code: '<StyledText uppercase>Uppercase Text</StyledText>',
        preview: () => <StyledText uppercase>Uppercase Text</StyledText>,
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
        name: 'fontSize',
        type: "'sm' | 'md' | 'lg' | 'xl' | number",
        required: false,
        default: "'md'",
        description: 'Font size preset or custom number',
      },
      {
        name: 'align',
        type: "'left' | 'center' | 'right'",
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
        name: 'bold',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Apply bold font weight',
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
        description: 'Apply muted/gray color',
      },
      {
        name: 'fontWeight',
        type: 'number',
        required: false,
        description: 'Custom font weight value',
      },
      {
        name: 'style',
        type: 'TextStyle',
        required: false,
        description: 'Custom style overrides',
      },
    ],
  },
  {
    name: 'Card',
    category: 'UI Primitive',
    description: 'A container component for displaying content within a styled card with theme-aware background and borders.',
    import: "import { Card } from 'zero-to-app';",
    examples: [
      {
        title: 'Basic',
        description: 'Simple card with text content',
        code: `<Card>
  <StyledText>Card content</StyledText>
</Card>`,
        preview: () => (
          <Card>
            <StyledText>Card content</StyledText>
          </Card>
        ),
      },
      {
        title: 'With Multiple Elements',
        description: 'Card containing multiple text elements',
        code: `<Card>
  <StyledText fontSize="lg" bold>Card Title</StyledText>
  <StyledText>Card description goes here</StyledText>
</Card>`,
        preview: () => (
          <Card>
            <StyledText fontSize="lg" bold>
              Card Title
            </StyledText>
            <StyledText>Card description goes here</StyledText>
          </Card>
        ),
      },
    ],
    props: [
      {
        name: 'children',
        type: 'ReactNode | ReactNode[]',
        required: false,
        description: 'Card content',
      },
    ],
  },
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
