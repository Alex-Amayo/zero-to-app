module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: [
      '**/node_modules/**', 
      '**/__tests__/**',    
      'build/',            
      '*.test.js',          
      '.expo/**',
      'dist/**',
    ],
};
