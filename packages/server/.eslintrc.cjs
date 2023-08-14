module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],

  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],

    // disallow use of console statements (except for console.error)
    "no-console": ["warn", { allow: ["error"] }],

    // disallow the unary operators ++ and --
    "no-plusplus": ["warn", { allowForLoopAfterthoughts: true }],

    // require the use of === and !==
    eqeqeq: ["error", "always", { null: "ignore" }],
  },

  ignorePatterns: ["dist/", ".eslintrc.js"],
};
