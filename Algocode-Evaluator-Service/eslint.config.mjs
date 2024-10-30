// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort'; // Corrected import for simple-import-sort plugin


export default tseslint.config({
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    files:["**/*.ts"],
    extends:[
      eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort, // Register the plugin
    },
    rules:{
     //"semi": ["error", "always"],
      //"no-console":"error",
       quotes:["error","single",{allowTemplateLiterals:true}],
       'simple-import-sort/imports': 'error', // Enable import sorting rule
       'simple-import-sort/exports': 'error', // Enable export sorting rule
       "@typescript-eslint/require-await": "off",
       "@typescript-eslint/no-misused-promises": ["error",{"checksVoidReturn": false}]
      },
  });