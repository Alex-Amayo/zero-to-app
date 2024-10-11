module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'expo',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    'no-unused-vars': 'warn',
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'no-var': 'error',
    'prefer-const': 'error',
  },
};
