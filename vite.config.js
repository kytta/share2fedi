import legacy from "@vitejs/plugin-legacy";
import { VitePluginNode } from "vite-plugin-node";

const vitePluginNode = VitePluginNode({
	// Workaround from: https://github.com/axe-me/vite-plugin-node/issues/47
	adapter({ app, req, res, next }) {
		if (req.url.startsWith("/api/")) {
			app(req, res);
		} else {
			next();
		}
	},
	appPath: "./api/share.js",
});
vitePluginNode[0].apply = "serve";

export default {
	build: {
		minify: "terser",
		terserOptions: { ecma: 5 },
		sourcemap: "true",
	},
	plugins: [legacy(), ...vitePluginNode],
};
