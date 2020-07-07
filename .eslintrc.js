// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    indent: 2,
    "comma-dangle": ["error", "never"],
    "quote-props": ["error", "as-needed"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "eol-last": ["error", "always"],
    "no-plusplus": "off",
    "template-curly-spacing": ["error", "always"],
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "arrow-parens": ["error", "as-needed"],
    "prefer-destructuring": ["error", { object: false, array: false }],
    "no-return-assign": "off",
    "vue/attribute-hyphenation": "off",
    "import/no-named-as-default": "off",
    "function-paren-newline": "off",
    "implicit-arrow-linebreak": "off",
    "consistent-return": "off",
    semi: ["error", "always"]
  }
}
