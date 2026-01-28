/* eslint-env node */
/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { defineConfig } from "astro/config";

import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

let adapterConfig = {};
if (process.env.VERCEL) {
	console.info("Using Vercel (serverless) adapter...");
	const { default: vercel } = await import("@astrojs/vercel/serverless");
	adapterConfig = {
		adapter: vercel({}),
	};
} else if (process.env.CF_PAGES) {
	console.info("Using Cloudflare (Pages) adapter...");
	const { default: cloudflare } = await import("@astrojs/cloudflare");
	adapterConfig = {
		adapter: cloudflare(),
	};
} else {
	console.info("Using Node.js adapter...");
	const { default: node } = await import("@astrojs/node");
	adapterConfig = {
		adapter: node({
			mode: "standalone",
		}),
	};
}

export default defineConfig({
	site: "https://s2f.kytta.dev",

	output: "server",
	...adapterConfig,

	vite: {
		css: {
			transformer: "lightningcss",
			lightningcss: {
				targets: browserslistToTargets(browserslist()),
			},
		},
		build: {
			cssMinify: "lightningcss",
		},
	},
});
