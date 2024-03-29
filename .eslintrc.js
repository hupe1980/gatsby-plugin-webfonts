module.exports = {
  parser: `@babel/eslint-parser`,
  extends: [`react-app`, `prettier`],
  plugins: [`prettier`],
  rules: {
    "prettier/prettier": `error`,
    quotes: [`error`, `backtick`],
  },
  overrides: [
    {
      files: [`**/cypress/integration/**/*`, `**/cypress/support/**/*`],
      globals: {
        cy: false,
        Cypress: false,
      },
    },
  ],
};
