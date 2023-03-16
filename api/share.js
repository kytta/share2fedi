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
import https from "https";

const pathsMap = {
	mastodon: {
		checkUrl: "/api/v1/instance",
		postUrl: "share",
		textParam: "text",
	},
	gnuSocial: {
		checkUrl: "/api/statusnet/version.xml",
		postUrl: "/notice/new",
		textParam: "status_textarea",
	},
};

const queryUrl = (url, service) => {
	return new Promise((resolve, reject) => {
		const get = url.protocol === "https:" ? https.get : http.get;
		get(url, ({ statusCode }) => {
			if (statusCode === 200) {
				console.debug(url.href, "is", service);
				resolve(service);
			} else {
				reject(url);
			}
		}).on("error", (error) => {
			reject(error);
		});
	});
};

const detectService = async (instanceURL) => {
	const checkPromises = Object.entries(pathsMap).map(
		([service, { checkUrl }]) =>
			queryUrl(new URL(checkUrl, instanceURL), service)
	);

	return await Promise.any(checkPromises);
};

const requestListener = async (request, response) => {
	if (request.method !== "POST") {
		response.writeHead(405).end();
		return;
	}

	let data = "";
	request.on("data", (chunk) => {
		data += chunk.toString();
	});

	request.on("end", () => {
		const requestBody = new URLSearchParams(data);
		const postText = requestBody.get("text") || "";
		const instanceURL =
			requestBody.get("instance") || "https://mastodon.social/";

		detectService(instanceURL)
			.then((service) => {
				const publishUrl = new URL(pathsMap[service].postUrl, instanceURL);
				publishUrl.search = new URLSearchParams([
					[pathsMap[service].textParam, postText],
				]);
				response.writeHead(303, { Location: publishUrl.toString() }).end();
			})
			.catch((error) => {
				response.writeHead(400).end(error);
			});
	});
};

if (!import.meta.env || import.meta.env.PROD) {
	http.createServer(requestListener).listen(8080);
}

export const viteNodeApp = requestListener;
