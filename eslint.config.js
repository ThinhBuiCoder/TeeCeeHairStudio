import js from '@eslint/js'
import globals from 'globals'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'scripts'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: { ecmaVersion: 2022, globals: globals.browser },
    rules: {
      // Chữ của nhãn nằm trong các span lồng nhau (khối lựa chọn dịch vụ), cần quét sâu hơn mặc định.
      'jsx-a11y/label-has-associated-control': ['error', { depth: 3 }],
    },
  },
)
