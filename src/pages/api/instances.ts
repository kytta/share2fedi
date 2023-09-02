/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { APIRoute } from "astro";
import { FediverseProject } from "@scripts/constants";

interface ProjectInstance {
	domain: string;
	score: number;
	active_users_monthly: number;
	total_users: number;
}

const PROJECTS = Object.values(FediverseProject);

export const fetchInstances = async (
	projectId: string,
): Promise<ProjectInstance[]> => {
	const response = await fetch("https://api.fediverse.observer/", {
		headers: {
			Accept: "*/*",
			"Accept-Language": "en;q=1.0",
			"Content-Type": "application/json",
		},
		referrer: "https://api.fediverse.observer/",
		body: JSON.stringify({
			query: `{nodes(status:"UP",softwarename:"${projectId}"){domain score active_users_monthly total_users}}`,
		}),
		method: "POST",
	});
	const json = await response.json();
	const instances: ProjectInstance[] = json.data.nodes;
	return instances.filter(
		(instance) =>
			instance.score > 90 &&
			instance.total_users >= instance.active_users_monthly,
	);
};

export const get: APIRoute = async () => {
	try {
		const response = await Promise.all(
			PROJECTS.map((projectId) => fetchInstances(projectId)),
		);
		const instances = response.flat();
		instances.sort((a, b) => {
			return b.active_users_monthly - a.active_users_monthly;
		});

		return new Response(
			JSON.stringify(
				instances
					.slice(0, 200)
					.map((instance: ProjectInstance) => instance.domain),
			),
			{
				headers: {
					"Cache-Control": "public, s-maxage=86400, max-age=604800",
					"Content-Type": "application/json",
				},
			},
		);
	} catch (error) {
		console.error("Could not fetch instances:", error);
		return new Response(JSON.stringify([]), {
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};
