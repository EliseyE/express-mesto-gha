module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
    es6: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'linebreak-style': 0,
  },
};
