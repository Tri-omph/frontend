// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "import/no-unresolved": 0,
    "@typescript-eslint/no-require-imports": "off",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".ts", ".tsx"],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "all",
        endOfLine: "auto",
      },
    ],
    "import/extensions": ["error", "never"],
    "react/prop-types": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
  ignorePatterns: ["/dist/*", "/components/__tests__", "node_modules/*"],
};
