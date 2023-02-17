module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:markdown/recommended',
    'prettier',
  ],
  rules: {
    // prettier
    'prettier/prettier': 'error',
  },
};
