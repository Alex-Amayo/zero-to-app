import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { View } from "react-native";
import { MyButton } from "./Button";
import { Button } from "@zero-to-app/ui";

const meta = {
  title: "MyButton",
  component: Button,
  args: {
    title: "Hello world",
    onPress: action("onPress"),
  },
  decorators: [
    (Story) => (
        <View style={{ padding: 16 }}>
          <Story />
        </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onPress: action("onPress"),
  },
};
