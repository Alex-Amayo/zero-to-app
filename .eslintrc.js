// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: [
      '**/node_modules/**', // Ignore all files within node_modules
      '**/__tests__/**',    // Ignore all files within __tests__ directories
      'build/',             // Ignore all files within the build directory
      '*.test.js',          // Ignore all .test.js files
      '.expo/**',
      'dist/**',
    ],
};
