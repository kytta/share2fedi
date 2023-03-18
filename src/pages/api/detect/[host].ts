/*!
 * © 2023 Nikita Karamov
 * Licensed under AGPL v3 or later
 */

import { APIRoute } from "astro";
import { normalizeURL } from "../../../util";

const PROJECTS = {
	mastodon: {
		checkUrl: "/api/v1/instance/rules",
		publishEndpoint: "share",
		params: {
			text: "text",
		},
	},
	gnuSocial: {
		checkUrl: "/api/gnusocial/config.xml",
		publishEndpoint: "/notice/new",
		params: {
			text: "status_textarea",
		},
	},
	pleroma: {
		checkUrl: "/api/v1/pleroma/federation_status",
		publishEndpoint: "share",
		params: {
			text: "message",
		},
	},
	friendica: {
		checkUrl: "/api/statusnet/config",
		publishEndpoint: "compose",
		params: {
			text: "body",
		},
	},
};

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
	const host = params.host;

	const promises = Object.entries(PROJECTS).map(([service, { checkUrl }]) =>
		checkProjectUrl(new URL(checkUrl, normalizeURL(host)), service),
	);
	try {
		const project = await Promise.any(promises);
		return new Response(
			JSON.stringify({
				host,
				project,
				publishEndpoint: PROJECTS[project].publishEndpoint,
				params: PROJECTS[project].params,
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
