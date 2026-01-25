import type { StorybookConfig } from "@storybook/react-native-web-vite";
import { mergeConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const main: StorybookConfig = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: ["@storybook/addon-docs", "@chromatic-com/storybook"],

  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "react-native-reanimated": path.resolve(
            __dirname,
            "./mocks/react-native-reanimated.ts"
          ),
          "react-native-worklets": path.resolve(
            __dirname,
            "./mocks/react-native-worklets.ts"
          ),
        },
      },
    });
  },
};

export default main;
