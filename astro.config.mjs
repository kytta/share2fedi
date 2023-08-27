import { defineConfig } from "astro/config";
import lightningcss from "vite-plugin-lightningcss";

import cloudflare from "@astrojs/cloudflare";
import deno from "@astrojs/deno";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";

let configMixin = {};
if (process.env.VERCEL) {
	console.info("Using Vercel (serverless) adapter...");
	configMixin = {
		output: "server",
		adapter: vercel(),
	};
} else if (process.env.CF_PAGES) {
	console.info("Using Cloudflare adapter...");
	configMixin = {
		output: "server",
		adapter: cloudflare(),
	};
} else if (process.env.NETLIFY) {
	console.info("Using Netlify (Functions) adapter...");
	configMixin = {
		output: "server",
		adapter: netlify(),
	};
} else if (process.argv.includes("--s2f-use-deno")) {
	console.info("Using Deno adapter...");
	configMixin = {
		output: "server",
		adapter: deno(),
	};
} else {
	console.info("Using Node.js adapter...");
	console.info("Run with '--s2f-use-deno' flag to use Deno");
	configMixin = {
		output: "server",
		adapter: node({
			mode: "standalone",
		}),
	};
}

export default defineConfig({
	site: "https://s2f.kytta.dev",
	...configMixin,
	vite: {
		plugins: [lightningcss()],
	},
});
