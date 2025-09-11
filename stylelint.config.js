// This Stylelint config is part of Share₂Fedi
// https://github.com/kytta/share2fedi
//
// SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
// SPDX-License-Identifier: CC0-1.0
/** @type {import('stylelint').Config} */
export default {
	extends: ["stylelint-config-standard", "stylelint-config-html/astro"],
	rules: {
		"selector-pseudo-class-no-unknown": [
			true,
			{
				ignorePseudoClasses: ["global"],
			},
		],
	},
};
