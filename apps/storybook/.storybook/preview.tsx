import type { Preview } from "@storybook/react-native";
import { withZeroToApp } from "./decorators";

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [withZeroToApp],

  tags: ["autodocs"],
};

export default preview;
