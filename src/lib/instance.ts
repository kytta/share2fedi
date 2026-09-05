/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { type supportedProjects } from "./project";
import {
	version,
	repository,
} from "../../package.json" assert { type: "json" };

// Testing has shown that top 200 fediverse servers run these projects' software.
// This way, we can avoid checking all 10+ projects we support
const POPULAR_SOFTWARES = [
	"mastodon",
	"fedibird",
	"misskey",
	"friendica",
	"sharkey",
] satisfies Array<keyof typeof supportedProjects>;

interface Instance {
	domain: string;
	score: number;
	active_users_monthly: number;
	total_users: number;
}

const query = `
	query ($softwarename: String!) {
		nodes(softwarename: $softwarename, status: "UP") {
			domain
			score
			active_users_monthly
			total_users
		}
	}
`;

const getInstancesForProject = async (
	project: keyof typeof supportedProjects,
): Promise<Instance[]> => {
	let instances: Instance[];

	try {
		const response = await fetch("https://api.fediverse.observer/", {
			headers: {
				Accept: "application/graphql-response+json, application/json",
				"Content-Type": "application/json",
				"User-Agent": `Share2Fedi/${version} (+${repository.url})`,
			},
			body: JSON.stringify({
				query,
				variables: { softwarename: project },
			}),
			method: "POST",
		});
		const json = await response.json();
		instances = json.data.nodes;
	} catch (error) {
		console.error(`Could not fetch instances for "${project}"`, error);
		return [];
	}

	return instances.filter(
		(instance) =>
			instance.score > 90 &&
			// sanity check for some spammy-looking instances
			instance.total_users >= instance.active_users_monthly,
	);
};

export const getPopularInstanceDomains = async (): Promise<string[]> => {
	const instancesPerProject = await Promise.all(
		POPULAR_SOFTWARES.map((project) => getInstancesForProject(project)),
	);
	const instances = instancesPerProject.flat();
	instances.sort((a, b) => b.active_users_monthly - a.active_users_monthly);

	return instances.slice(0, 200).map((instance) => instance.domain);
};
