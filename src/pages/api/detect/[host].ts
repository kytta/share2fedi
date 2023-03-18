/*!
 * © 2023 Nikita Karamov
 * Licensed under AGPL v3 or later
 */

import type { APIRoute } from "astro";
import { normalizeURL } from "../../../util";

interface FediverseProjectBasic {
	publishEndpoint: string;
	params: {
		text: string;
	};
}

interface FediverseProjectCheckFunction extends FediverseProjectBasic {
	check: (url: string) => Promise<string>;
}

interface FediverseProjectCheckUrl extends FediverseProjectBasic {
	checkUrl: string;
}

type FediverseProject =
	| FediverseProjectCheckUrl
	| FediverseProjectCheckFunction;

const PROJECTS: Map<string, FediverseProject> = new Map([
	[
		"mastodon",
		{
			checkUrl: "/api/v1/instance/rules",
			publishEndpoint: "share",
			params: {
				text: "text",
			},
		},
	],
	[
		"gnuSocial",
		{
			checkUrl: "/api/gnusocial/config.xml",
			publishEndpoint: "/notice/new",
			params: {
				text: "status_textarea",
			},
		},
	],
	[
		"pleroma",
		{
			checkUrl: "/api/v1/pleroma/federation_status",
			publishEndpoint: "share",
			params: {
				text: "message",
			},
		},
	],
	[
		"friendica",
		{
			checkUrl: "/api/statusnet/config",
			publishEndpoint: "compose",
			params: {
				text: "body",
			},
		},
	],
	[
		"hubzilla",
		{
			check: async (url: string): Promise<string> => {
				const response = await fetch(url);
				const htmlBody = await response.text();
				console.debug(htmlBody);
				if (
					htmlBody.includes(
						'<meta name="application-name" content="hubzilla" />',
					)
				) {
					return "hubzilla";
				}
				throw new Error(`${url} doesn't host Hubzilla`);
			},
			checkUrl: "/.well-known/zot-info",
			publishEndpoint: "rpost",
			params: {
				text: "body",
			},
		},
	],
]);

const checkProjectUrl = (
	urlToCheck: URL,
	projectId: string,
): Promise<string> => {
	return new Promise((resolve, reject) => {
		fetch(urlToCheck)
			.then((response) => {
				if (response.ok) {
					resolve(projectId);
				} else {
					reject(urlToCheck);
				}
			})
			.catch((error) => {
				reject(error.toString());
			});
	});
};

export const get: APIRoute = async ({ params }) => {
	const host = params.host as string;

	const promises = Object.entries(PROJECTS).map(([service, project]) => {
		const url = normalizeURL(host);
		if (project.check !== undefined) {
			return project.check(url);
		}
		return checkProjectUrl(new URL(project.checkUrl, url), service);
	});
	try {
		const projectId = await Promise.any(promises);

		if (!PROJECTS.has(projectId)) {
			throw new Error(`Unexpected project ID: ${projectId}`);
		}

		const project = PROJECTS.get(projectId) as FediverseProject;

		return new Response(
			JSON.stringify({
				host,
				project: projectId,
				publishEndpoint: project.publishEndpoint,
				params: project.params,
			}),
			{
				status: 200,
				headers: {
					"Cache-Control": "s-maxage=86400, max-age=86400, public",
					"Content-Type": "application/json",
				},
			},
		);
	} catch {
		return new Response(JSON.stringify({ error: "Couldn't detect instance" }), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};
