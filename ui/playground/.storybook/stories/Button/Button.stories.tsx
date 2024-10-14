import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Button } from "@zero-to-app/components";

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    title: { control: 'text' },
    secondary: { control: 'boolean' },
    loading: { control: 'boolean' }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Primary Button',
  secondary: false,
  loading: false,
  onPress: () => alert('Primary Button Pressed')
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'Secondary Button',
  secondary: true,
  loading: false,
  onPress: () => alert('Secondary Button Pressed')
};

export const Loading = Template.bind({});
Loading.args = {
  title: 'Loading Button',
  loading: true
};
