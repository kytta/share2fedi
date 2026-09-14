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
import type { AstroIntegration } from "astro";
import { configure, getConsoleSink, type LogLevel, type Config } from "@logtape/logtape";


function logtape() {
	return {
		name: "startup-logging",
		hooks: {
			"astro:config:setup": async () => {
				await configure({
					sinks: { console: getConsoleSink() },
					loggers: [
						{ category: ["logtape", "meta"], lowestLevel: "warning", sinks: ["console"] },
						{ category: ["astro"], lowestLevel: "debug", sinks: ["console"] }
					]
				});
			},
		},
	} satisfies AstroIntegration;
}

export default defineConfig({
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	logger: {
		entrypoint: "./src/lib/logging.ts",
	},
	integrations: [logtape()],
	session: false,
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
