import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
    globalIgnores(["src/bloks.mjs", "dist"]),
    {
        languageOptions: {
            globals: {
                ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
                ...globals.commonjs,
                ...globals.node,
                ...globals.mocha,
            },

            ecmaVersion: 2022,
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        rules: {
            "no-const-assign": "warn",
            "no-this-before-super": "warn",
            "no-undef": "warn",
            "no-unreachable": "warn",
            "no-unused-vars": "warn",
            "constructor-super": "warn",
            "valid-typeof": "warn",
        },
    }]);