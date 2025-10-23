import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  stylistic.configs.recommended,
  pluginJs.configs.recommended,
  {
    files: [
      '**/*.js',
    ],
  },
  {
    ignores: ['dist/'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@stylistic/semi': 'error',
      '@stylistic/arrow-parens': 'error',
      '@stylistic/no-multiple-empty-lines': 'error',
      '@stylistic/eol-last': 'error',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
]
