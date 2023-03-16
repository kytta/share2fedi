import legacy from "@vitejs/plugin-legacy";
import { VitePluginNode } from "vite-plugin-node";

export default {
	build: {
		minify: "terser",
		terserOptions: { ecma: 5 },
		sourcemap: "true",
	},
	plugins: [
		legacy(),
		VitePluginNode({
			// Workaround from: https://github.com/axe-me/vite-plugin-node/issues/47
			adapter({ app, req, res, next }) {
				if (req.url.startsWith("/api/")) {
					app(req, res);
				} else {
					next();
				}
			},
			appPath: "./api/share.js",
		}),
	],
};
