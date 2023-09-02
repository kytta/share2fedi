/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { getUrlDomain } from "@lib/url";
import type { APIRoute } from "astro";
import type { Detection } from "./detect/[domain]";
import { error } from "@lib/response";

export const post: APIRoute = async ({ redirect, request, url }) => {
	const formData = await request.formData();

	const text = (formData.get("text") as string) || "";
	const instanceHost =
		getUrlDomain(formData.get("instance") as string) || "mastodon.social";

	const response = await fetch(new URL(`/api/detect/${instanceHost}`, url));
	const json = await response.json();
	if (json.error) {
		return error(json.error);
	}

	const { domain, endpoint, params } = json as Detection;
	const publishUrl = new URL(endpoint, `https://${domain}/`);
	publishUrl.search = new URLSearchParams([[params.text, text]]).toString();
	return redirect(publishUrl.toString(), 303);
};
