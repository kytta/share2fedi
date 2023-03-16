import legacy from "@vitejs/plugin-legacy";

export default {
	build: {
		minify: "terser",
		terserOptions: { ecma: 5 },
		sourcemap: "true",
	},
	plugins: [legacy()],
};
