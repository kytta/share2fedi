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
