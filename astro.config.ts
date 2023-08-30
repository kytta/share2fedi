/* eslint-env node */
import { defineConfig } from "astro/config";
import lightningcss from "vite-plugin-lightningcss";

import cloudflare from "@astrojs/cloudflare";
import deno from "@astrojs/deno";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";

let adapterConfig = {};
if (process.env.VERCEL) {
	console.info("Using Vercel (serverless) adapter...");
	adapterConfig = {
		adapter: vercel(),
		build: {
			split: true,
		},
	};
} else if (process.env.CF_PAGES) {
	console.info("Using Cloudflare adapter...");
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

export default defineConfig({
	site: "https://s2f.kytta.dev",

	compressHTML: true,

	output: "server",
	...adapterConfig,

	vite: {
		plugins: [lightningcss()],
	},
});
