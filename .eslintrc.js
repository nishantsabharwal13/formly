module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended', 'google'],
  plugins: ['babel'],
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'arrow-parens': [2, 'as-needed'],
    'keyword-spacing': [2, {
      before: true,
      after: true,
    }],
    'quote-props': [2, 'as-needed'],
    'max-len': [2, {
      code: 120,
      tabWidth: 2,
    }],
    'no-multi-spaces': [2, {
      exceptions: {
        ImportDeclaration: true,
      }
    }],

    // TODO
    // Need to improve these rules
    'require-jsdoc': 0,

    // BABEL Plugin
    'object-curly-spacing': 0,
    'babel/object-curly-spacing': 1,
    'no-invalid-this': 0,
    'babel/no-invalid-this': 1,
  },
  globals: {
    __DEV__: true
  }
};
