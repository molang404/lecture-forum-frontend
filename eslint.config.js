import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["warn", {
                "ignoreRestSiblings": true,     // ...rest (구조분해할당)에서 제외된 변수는 규칙에서 무시)
                "varsIgnorePattern": "^_",      // _로 시작하는 변수는 규칙에서 무시
                "argsIgnorePattern": "^_",      // _로 시작하는 함수 인자 변수는 규칙에서 무시
            }]
        }
    },
]);
