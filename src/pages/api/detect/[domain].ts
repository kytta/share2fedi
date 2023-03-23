/*!
 * © 2023 Nikita Karamov
 * Licensed under AGPL v3 or later
 */

import type { APIRoute } from "astro";
import { FediverseProject } from "../../../constants";
import { normalizeURL } from "../../../util";

interface FediverseProjectData {
	publishEndpoint: string;
	params: {
		text: string;
	};
}

const mastodonSettings = {
	publishEndpoint: "share",
	params: {
		text: "text",
	},
};

const pleromaSettings = {
	publishEndpoint: "share",
	params: {
		text: "message",
	},
};

const PROJECTS: Map<FediverseProject, FediverseProjectData> = new Map([
	[FediverseProject.Akkoma, pleromaSettings],
	[FediverseProject.Mastodon, mastodonSettings],
	[FediverseProject.Hometown, mastodonSettings],
	[
		FediverseProject.GNUSocial,
		{
			publishEndpoint: "/notice/new",
			params: {
				text: "status_textarea",
			},
		},
	],
	[FediverseProject.Pleroma, pleromaSettings],
	[
		FediverseProject.Friendica,
		{
			publishEndpoint: "compose",
			params: {
				text: "body",
			},
		},
	],
	[
		FediverseProject.Hubzilla,
		{
			publishEndpoint: "rpost",
			params: {
				text: "body",
			},
		},
	],
	[
		FediverseProject.Misskey,
		{
			publishEndpoint: "share",
			params: {
				text: "text",
			},
		},
	],
]);

interface NodeInfoList {
	links: {
		rel: string;
		href: string;
	}[];
}

interface NodeInfo {
	[key: string]: unknown;
	software: {
		[key: string]: unknown;
		name: string;
	};
}

type NonEmptyArray<T> = [T, ...T[]];
function isNotEmpty<T>(array: T[]): array is NonEmptyArray<T> {
	return array.length > 0;
}

const checkNodeInfo = async (domain: string): Promise<FediverseProject> => {
	const nodeInfoListUrl = new URL(
		"/.well-known/nodeinfo",
		normalizeURL(domain),
	);
	const nodeInfoListResponse = await fetch(nodeInfoListUrl);
	const nodeInfoList = (await nodeInfoListResponse.json()) as NodeInfoList;

	if (isNotEmpty(nodeInfoList.links)) {
		const nodeInfoUrl = nodeInfoList.links[0].href;
		const nodeInfoResponse = await fetch(nodeInfoUrl);
		const nodeInfo = (await nodeInfoResponse.json()) as NodeInfo;

		return nodeInfo.software.name as FediverseProject;
	} else {
		throw new Error(`No nodeinfo found for ${domain}`);
	}
};

export const get: APIRoute = async ({ params }) => {
	const domain = params.domain as string;

	try {
		const projectId = await checkNodeInfo(domain);

		if (!PROJECTS.has(projectId)) {
			throw new Error(`Unexpected project ID: ${projectId}`);
		}
		const projectData = PROJECTS.get(projectId) as FediverseProjectData;
		return new Response(
			JSON.stringify({
				host: domain,
				project: projectId,
				publishEndpoint: projectData.publishEndpoint,
				params: projectData.params,
			}),
			{
				status: 200,
				headers: {
					"Cache-Control": "s-maxage=86400, max-age=86400, public",
					"Content-Type": "application/json",
				},
			},
		);
	} catch {
		return new Response(JSON.stringify({ error: "Couldn't detect instance" }), {
			status: 404,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};
