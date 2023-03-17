import { APIRoute } from "astro";

export const post: APIRoute = async ({ redirect, request }) => {
	const formData = await request.formData();

	const text = (formData.get("text") as string) || "";
	const instanceDomain =
		(formData.get("instance") as string) || "mastodon.social";

	const publishUrl = new URL("/share", `https://${instanceDomain}/`);
	publishUrl.search = new URLSearchParams({
		text,
	}).toString();

	return redirect(publishUrl.toString(), 303);
};
