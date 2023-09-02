/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { getUrlDomain } from "@scripts/util";
import type { APIRoute } from "astro";

export const post: APIRoute = async ({ redirect, request, url }) => {
	const formData = await request.formData();

	const text = (formData.get("text") as string) || "";
	const instanceHost =
		getUrlDomain(formData.get("instance") as string) || "mastodon.social";

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
