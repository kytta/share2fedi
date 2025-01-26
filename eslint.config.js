// This ESLint config is part of Share₂Fedi
// https://github.com/kytta/share2fedi
//
// SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
// SPDX-License-Identifier: CC0-1.0
import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";
import astro from "eslint-plugin-astro";
import unicorn from "eslint-plugin-unicorn";
import prettier from "eslint-config-prettier";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
	{
		ignores: [".astro", ".vercel/", "dist/", "script/"],
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	js.configs.recommended,
	...ts.configs.recommended,
	unicorn.configs["flat/recommended"],
	...astro.configs["jsx-a11y-strict"],
	prettier,
];
