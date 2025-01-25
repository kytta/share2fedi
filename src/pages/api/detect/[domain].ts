/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { APIRoute } from "astro";
import { actions } from "astro:actions";

import { error, json } from "@lib/response";

export const GET: APIRoute = async ({ params, callAction }) => {
	const domain = params.domain as string;

	const { data, error: actionError } = await callAction(actions.detect, domain);

	if (actionError) {
		return error(actionError.message);
	}

	return json(data, 200, {
		"Cache-Control": "public, s-maxage=604800, max-age=604800",
	});
};
