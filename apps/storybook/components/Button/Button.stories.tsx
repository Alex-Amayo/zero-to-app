import type { Meta, StoryObj } from "@storybook/react-native";
import { View, StyleSheet } from "react-native";
import { Button } from "zero-to-app";

// Mock function for onPress handler
const mockOnPress = () => {
  console.log("Button pressed");
};

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    title: "Button",
    onPress: mockOnPress,
  },
  argTypes: {
    title: {
      control: "text",
      description: "Button text label",
    },
    secondary: {
      control: "boolean",
      description: "Use secondary (outlined) style",
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the icon relative to text",
    },
    onPress: {
      action: "pressed",
      description: "Callback when button is pressed",
    },
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Primary Button",
    secondary: false,
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Button",
    secondary: true,
  },
};

export const WithIcon: Story = {
  args: {
    title: "Button with Icon",
    icon: {
      library: "Feather",
      name: "arrow-right",
      size: 20,
    },
    iconPosition: "right",
  },
};

export const WithIconLeft: Story = {
  args: {
    title: "Button with Icon",
    icon: {
      library: "Feather",
      name: "arrow-left",
      size: 20,
    },
    iconPosition: "left",
  },
};

export const Loading: Story = {
  args: {
    title: "Loading Button",
    loading: true,
  },
};

export const SecondaryLoading: Story = {
  args: {
    title: "Loading Secondary",
    secondary: true,
    loading: true,
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
