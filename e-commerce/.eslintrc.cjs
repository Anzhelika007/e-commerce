module.exports = {
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "airbnb" ,
    "airbnb-typescript" ,
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "prettier"
  ],
  "overrides": [
  ],
  "ignorePatterns": [
    'dist', '.eslintrc.cjs', 'vite.config.ts', 'coverage'
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": './tsconfig.json',
    "tsconfigRootDir": __dirname,
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
      // "react-refresh/only-export-components": ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 0,
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    // slider
    "jsx-a11y/no-noninteractive-element-to-interactive-role": "off",
  }
}
