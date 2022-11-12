module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "no-empty": "warn",
    quotes: "off"
  }
};
