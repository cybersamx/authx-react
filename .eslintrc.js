module.exports = {
  extends: [
    'airbnb-base',
    'react-app',
    'react-app/jest',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
  },
  plugins: ['prettier'],
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  globals: {
    page: true,
    browser: true,
    context: true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
