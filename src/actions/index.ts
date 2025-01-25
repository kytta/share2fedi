/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

import { getSoftwareName } from "@lib/nodeinfo";
import { type ProjectPublishConfig, supportedProjects } from "@lib/project";

export type Detection = {
	domain: string;
	project: keyof typeof supportedProjects;
} & ProjectPublishConfig;

export const server = {
	detect: defineAction({
		input: z.string().min(5).includes("."),
		handler: async (domain): Promise<Detection> => {
			const softwareName = await getSoftwareName(domain);
			if (softwareName === undefined) {
				throw new ActionError({
					message: "Could not detect Fediverse project.",
					code: "BAD_REQUEST",
				});
			}

			if (!(softwareName in supportedProjects)) {
				throw new ActionError({
					message: `Fediverse project "${softwareName}" is not supported yet.`,
					code: "BAD_REQUEST",
				});
			}

			const publishConfig = supportedProjects[
				softwareName
			] as ProjectPublishConfig;

			return {
				domain,
				project: softwareName,
				...publishConfig,
			};
		},
	}),
};
