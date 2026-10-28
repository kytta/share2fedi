/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { APIRoute } from "astro";
import { json } from "@lib/response";

export const GET: APIRoute = async () => {
	return json([], 200, {
		Deprecation: "@1791741341",
		Link: '<https://github.com/kytta/share2fedi/issues/392>; rel="deprecation"; type="text/html"',
	});
};
