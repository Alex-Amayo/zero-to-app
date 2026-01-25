import type { Meta, StoryObj } from "@storybook/react-native";
import { View, StyleSheet } from "react-native";
import { Button } from "zero-to-app";

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
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
      description: "Button variant style",
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disable button interactions",
    },
    raised: {
      control: "boolean",
      description: "Add shadow/elevation to button",
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

// Variants
export const Default: Story = {
  args: {
    title: "Default Button",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Button",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    title: "Outline Button",
    variant: "outline",
  },
};

export const Destructive: Story = {
  args: {
    title: "Delete",
    variant: "destructive",
  },
};

// With Icons
export const WithIconRight: Story = {
  args: {
    title: "Next",
    variant: "default",
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
    title: "Back",
    variant: "outline",
    icon: {
      library: "Feather",
      name: "arrow-left",
      size: 20,
    },
    iconPosition: "left",
  },
};

// States
export const Loading: Story = {
  args: {
    title: "Loading...",
    variant: "default",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled",
    variant: "default",
    disabled: true,
  },
};

export const Raised: Story = {
  args: {
    title: "Raised Button",
    variant: "default",
    raised: true,
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
