import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import global from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, 'simple-import-sort': simpleImportSort },
    extends: ['js/recommended'],
    languageOptions: { globals: global.node },
    rules: {
      ...js.configs.recommended.rules,
      // 🔥 Enable import sort rules
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  }
]);
