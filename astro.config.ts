import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify/functions";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";

let astroAdapter;
if (process.env.VERCEL) {
	console.debug("Using Vercel adapter");
	astroAdapter = vercel();
} else if (process.env.NETLIFY) {
	console.debug("Using Netlify adapter");
	astroAdapter = netlify();
} else {
	console.debug("Using Node.js adapter");
	astroAdapter = node({
		mode: "standalone",
	});
}

export default defineConfig({
	site: "https://s2f.kytta.dev",
	adapter: astroAdapter,
	output: "server",
});
