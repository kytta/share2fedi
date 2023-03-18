/*!
 * © 2023 Nikita Karamov
 * Licensed under AGPL v3 or later
 */

import type { APIRoute } from "astro";

export const post: APIRoute = async ({ redirect, request, url }) => {
	const formData = await request.formData();

	const text = (formData.get("text") as string) || "";
	const instanceHost =
		(formData.get("instance") as string) || "mastodon.social";

	try {
		const response = await fetch(new URL(`/api/detect/${instanceHost}`, url));
		const { host, publishEndpoint, params } = await response.json();
		const publishUrl = new URL(publishEndpoint, `https://${host}/`);
		publishUrl.search = new URLSearchParams([[params.text, text]]).toString();
		return redirect(publishUrl.toString(), 303);
	} catch {
		return new Response(JSON.stringify({ error: "Couldn't detect instance" }), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};
