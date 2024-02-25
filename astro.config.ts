/* eslint-env node */
/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import deno from "@astrojs/deno";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";

import browserslist from "browserslist";
import { browserslistToTargets, transform } from "lightningcss";

let adapterConfig = {};
if (process.env.VERCEL) {
	console.info("Using Vercel (serverless) adapter...");
	adapterConfig = {
		adapter: vercel({
			functionPerRoute: true,
		}),
	};
} else if (process.env.CF_PAGES) {
	console.info("Using Cloudflare (Pages) adapter...");
	adapterConfig = {
		adapter: cloudflare(),
	};
} else if (process.env.NETLIFY) {
	console.info("Using Netlify (Functions) adapter...");
	adapterConfig = {
		adapter: netlify(),
	};
} else if (process.argv.includes("--s2f-use-deno")) {
	console.info("Using Deno adapter...");
	adapterConfig = {
		adapter: deno(),
	};
} else {
	console.info("Using Node.js adapter...");
	console.info("Run with '--s2f-use-deno' flag to use Deno");
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
