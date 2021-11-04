/*!
	toot - Cross-instance share page for Mastodon
	Copyright (C) 2020-2021  Nikita Karamov <me@kytta.dev>

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
*/

const http = require("http");

http
	.createServer(async (req, res) => {
		const buffers = [];
		for await (const chunk of req) {
			buffers.push(chunk);
		}
		const data = Buffer.concat(buffers).toString();
		const params = new URLSearchParams(data);

		const text = params.get("text") || "";
		const instanceURL = params.get("instance") || "https://mastodon.social/";

		const finalURL = new URL("share", instanceURL);
		finalURL.search = new URLSearchParams({ text }).toString();

		res.writeHead(303, { Location: finalURL.toString() }).end();
	})
	.listen(8000);
