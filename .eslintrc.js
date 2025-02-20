const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'promise'],
  parserOptions: {
    project: [
      path.resolve(__dirname, 'tsconfig.json'),
      path.resolve(__dirname, 'cypress/tsconfig.json'),
    ],
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    // Support Typescript's `paths` aliases (e.g. `~/` to `./app/`).
    // @see {@link https://stackoverflow.com/a/57678771}
    'import/resolver': { typescript: {} },
  },
  rules: {
    // Support Typescript's triple slash directive comments in reference files.
    // {@link https://github.com/typescript-eslint/typescript-eslint/issues/600}
    'spaced-comment': ['error', 'always', { markers: ['/'] }],

    // Use `void` operator to deal with dangling promises.
    // @see {@link https://eslint.org/docs/rules/no-void}
    // @example
    // public componentDidUpdate(): void {
    //   void someAsyncSideEffectFunction();
    // }
    //
    // private async someAsyncSideEffectFunction(): Promise<void> {
    //   ...do async side effect stuff
    // }
    'no-void': ['warn', { allowAsStatement: true }],

    // Allow for skipping code paths by returning undefined values or callbacks.
    // @see {@link https://eslint.org/docs/rules/consistent-return}
    // @example
    // function doSomething(val: string) {
    //   if (val === 'do-nothing') return;
    //   if (val === 'do-this-thing') return doThisThing():
    //   doSomethingElse();
    // }
    'consistent-return': ['warn', { treatUndefinedAsUnspecified: true }],

    // Disallow multiple empty lines, only one newline at the end, and no new
    // lines at the beginning.
    // @see {@link https://eslint.org/docs/rules/no-multiple-empty-lines}
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

    // Remix encourages throwing response literals in loader functions.
    // @see {@link https://remix.run/docs/en/v1/guides/not-found#how-to-send-a-404}
    // @see {@link https://typescript-eslint.io/rules/no-throw-literal}
    '@typescript-eslint/no-throw-literal': 'warn',

    // Disallow unused variables (variables that are declared and not used
    // anywhere in our code).
    // @see {@link https://eslint.org/docs/rules/no-unused-vars}
    // @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md}
    '@typescript-eslint/no-unused-vars': 'error',

    // Bind methods in constructor (don't use arrow functions as class fields).
    // {@link https://github.com/airbnb/javascript/tree/master/react#methods}
    // {@link https://github.com/typescript-eslint/typescript-eslint/issues/636}
    '@typescript-eslint/unbound-method': 'warn',

    // Specify inferable types for function parameters. Otherwise, we get type
    // errors when trying to do something like this:
    // @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-inferrable-types.md}
    // @example
    // async function search(query: string = '') {
    //   const { users } = await new Query({ query }).search();
    //   return users.map(userToOption);
    // }
    '@typescript-eslint/no-inferrable-types': [
      'error',
      { ignoreParameters: true },
    ],

    // Allow classes with custom `toString()` methods to be used directly in
    // template string expressions.
    // @see {@link https://git.io/JncB8}
    // @see {@link https://github.com/typescript-eslint/typescript-eslint/issues/3538}
    '@typescript-eslint/restrict-template-expressions': 'warn',

    // Reset to the default static property placement (so all class static field
    // declarations remain inside of the class).
    // @todo Perhaps we want to use the AirBNB recommended styling.
    // @see {@link https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md}
    // @see {@link https://github.com/airbnb/javascript/tree/master/react#ordering}
    'react/static-property-placement': ['error', 'static public field'],

    // We're disabling this so often, it just made sense to make it a 'warning'.
    // {@link https://github.com/airbnb/javascript/tree/master/react#props}
    // {@link https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md}
    'react/jsx-props-no-spreading': 'warn',

    // Next.js already imports React globally and handles JSX for us.
    // @see {@link https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md}
    'react/react-in-jsx-scope': 'off',

    // I use TypeScript default object property syntax instead of React's
    // `defaultProps` functionality (to reduce code complexity).
    // @see {@link https://git.io/JnsaY}
    'react/require-default-props': 'off',

    // I use index keys when rendering fallback loading screens where:
    // 1. the list and items are static–they are not computed and do not change;
    // 2. the items in the list have no ids;
    // 3. the list is never reordered or filtered.
    // @see {@link https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md}
    // @see {@link https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318}
    'react/no-array-index-key': 'warn',

    // Configure `jsx-a11y` to recognize RMWC input components as controls.
    // {@link https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md#case-my-label-and-input-components-are-custom-components}
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: ['Checkbox', 'TextField', 'Select'],
      },
    ],

    // Expect `<a>` tags to not have `href` attributes when wrapped with the
    // Next.js `<Link>` component.
    // @see {@link https://git.io/Jns2B}
    'jsx-a11y/anchor-is-valid': 'warn',

    // Sort imports using ESLint (the AirBNB config disables these opinionated
    // import sorting rules). This sorts the imports within each import group
    // (e.g. built-ins, externals, internals) alphabetically.
    // @see {@link https://eslint.org/docs/rules/sort-imports}
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],

    // Remix requires specific named exports for route files (e.g. loader).
    // @see {@link https://remix.run/docs/en/v1/api/conventions#loader}
    // @see {@link https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md}
    'import/prefer-default-export': 'off',

    // Split imports by type. This adds a newline between each import group
    // (e.g. built-ins, externals, internals). Those import groups are then
    // sorted alphabetically by the `sort-imports` rule.
    // @see {@link https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md}
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'pathGroups': [
          {
            pattern: 'pages/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'lib/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'styles/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'locales/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'cypress/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'assets/**',
            group: 'internal',
            position: 'after',
          },
        ],
        'pathGroupsExcludedImportTypes': ['builtin'],
        'newlines-between': 'always',
      },
    ],
  },
  reportUnusedDisableDirectives: true,
};
