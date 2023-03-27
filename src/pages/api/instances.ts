/*!
 * © 2023 Nikita Karamov
 * Licensed under AGPL v3 or later
 */

import type { APIRoute } from "astro";
import { FediverseProject } from "@scripts/constants";

interface ProjectInstance {
	domain: string;
	score: number;
	active_users_monthly: number;
	status: number;
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
		body: `{"query":"{\\n  nodes(softwarename: \\"${projectId}\\") {\\n    domain\\n    score\\n    active_users_monthly\\n    status\\n  }\\n}\\n"}`,
		method: "POST",
	});
	const json = await response.json();
	const instances: ProjectInstance[] = json.data.nodes;
	return instances.filter(
		(instance) => instance.score > 0 && instance.status === 1,
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
					"Cache-Control": "s-maxage=86400, max-age=86400, public",
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
