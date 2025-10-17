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
      '@stylistic/semi': 'off',
      '@stylistic/arrow-parens': 'off',
      '@stylistic/no-multiple-empty-lines': 'off',
      '@stylistic/eol-last': 'off',
    },
  },
]
