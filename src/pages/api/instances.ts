/*!
 * © 2023 Nikita Karamov
 * Licensed under AGPL v3 or later
 */

import { APIRoute } from "astro";

export const get: APIRoute = async () => {
	const response = await fetch("https://api.joinmastodon.org/servers");
	const instances = await response.json();

	return new Response(
		JSON.stringify(instances.map((instance) => instance.domain)),
		{
			headers: {
				"Cache-Control": "s-maxage=86400, max-age=86400, public",
				"Content-Type": "application/json",
			},
		},
	);
};
