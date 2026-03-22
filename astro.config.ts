/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

export default defineConfig({
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	security: {
		allowedDomains: [{}],
	},
	vite: {
		css: {
			transformer: "lightningcss",
			lightningcss: {
				targets: browserslistToTargets(browserslist()),
			},
		},
	},
});
