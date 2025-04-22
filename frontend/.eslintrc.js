module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // You can override specific rules here
  },
};
