/*!
 * © 2023 Nikita Karamov
 * Licensed under AGPL v3 or later
 */

import type { APIRoute } from "astro";

interface MastodonServer {
	[key: string]: unknown;
	domain: string;
}

export const get: APIRoute = async () => {
	try {
		const response = await fetch("https://api.joinmastodon.org/servers");
		const instances = await response.json();

		return new Response(
			JSON.stringify(
				instances.map((instance: MastodonServer) => instance.domain),
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