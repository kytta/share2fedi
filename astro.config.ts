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
import { browserslistToTargets, transform } from "lightningcss";

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
} else if (process.env.NETLIFY) {
	console.info("Using Netlify (Functions) adapter...");
	const { default: netlify } = await import("@astrojs/netlify");
	adapterConfig = {
		adapter: netlify(),
	};
} else if (process.argv.includes("--s2f-use-deno")) {
	console.info("Using Deno adapter...");
	const { default: deno } = await import("@deno/astro-adapter");
	adapterConfig = {
		adapter: deno(),
	};
} else {
	console.info("Using Node.js adapter...");
	console.info("Run with '--s2f-use-deno' flag to use Deno");
	const { default: node } = await import("@astrojs/node");
	adapterConfig = {
		adapter: node({
			mode: "standalone",
		}),
	};
}

const lightningCssPlugin = () => {
	const targets = browserslistToTargets(browserslist());
	return {
		name: "vite-plugin-lightningcss",
		transform(source: string, id: string) {
			if (!id.endsWith(".css")) return;

			const { code, map } = transform({
				filename: id,
				code: Buffer.from(source),
				minify: true,
				sourceMap: true,
				targets,
			});
			return {
				code: code.toString(),
				// eslint-disable-next-line unicorn/no-null
				map: map ? map.toString() : null,
			};
		},
	};
};

export default defineConfig({
	site: "https://s2f.kytta.dev",

	output: "server",
	...adapterConfig,

	vite: {
		plugins: [lightningCssPlugin()],
	},
});
