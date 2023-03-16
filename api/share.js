/*!
	share2fedi - Instance-agnostic share page for the Fediverse.
	Copyright (C) 2020-2023  Nikita Karamov <me@kytta.dev>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published
	by the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.

	SPDX-License-Identifier: AGPL-3.0-or-later
*/

import http from "http";

const requestListener = async (request, response) => {
	const buffers = [];
	for await (const chunk of request) {
		buffers.push(chunk);
	}
	const data = Buffer.concat(buffers).toString();
	const searchParameters = new URLSearchParams(data);

	const text = searchParameters.get("text") || "";
	const instanceURL =
		searchParameters.get("instance") || "https://mastodon.social/";

	const finalURL = new URL("share", instanceURL);
	finalURL.search = new URLSearchParams({ text }).toString();

	response.writeHead(303, { Location: finalURL.toString() }).end();
};

if (!import.meta.env || import.meta.env.PROD) {
	http.createServer(requestListener).listen(8080);
}

export const viteNodeApp = requestListener;
