// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
