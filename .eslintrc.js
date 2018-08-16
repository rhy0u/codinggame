module.exports = {
  root: true,
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/destructuring-assignment': ['enabled', 'always'],

    'import/prefer-default-export': 'off',

    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/anchor-has-content': 'off',

    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-nested-ternary': 'off',
    'no-unused-state': 'off,',
  },
}
