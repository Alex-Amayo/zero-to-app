import React from "react";
import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import type { Preview } from "@storybook/react-native";
import { Platform } from "react-native";
import { ZeroToApp } from "zero-to-app";
import { storybookBrand } from "../.storybook/brand-config";

// fix for actions on web
if (Platform.OS === "web") {
  // @ts-ignore
  global.ProgressTransitionRegister = {};
  // @ts-ignore
  global.UpdatePropsManager = {};
}

const withZeroToApp = (Story: React.ComponentType) => (
  <ZeroToApp brand={storybookBrand}>
    <Story />
  </ZeroToApp>
);

const preview: Preview = {
  decorators: [withZeroToApp, withBackgrounds],

  parameters: {
    backgrounds: {
      default: "plain",
      values: [
        { name: "plain", value: "white" },
        { name: "warm", value: "hotpink" },
        { name: "cool", value: "deepskyblue" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
