/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { normalizeURL } from "$lib/url.ts";

interface NodeInfoList {
  links: {
    rel: string;
    href: string;
  }[];
}

interface NodeInfo {
  software: {
    name: string;
    version: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export const getSoftwareName = async (
  domain: string,
): Promise<string | undefined> => {
  const nodeInfoListUrl = new URL(
    "/.well-known/nodeinfo",
    normalizeURL(domain),
  );

  let nodeInfoList: NodeInfoList;
  try {
    const nodeInfoListResponse = await fetch(nodeInfoListUrl);
    nodeInfoList = await nodeInfoListResponse.json();
  } catch (error) {
    console.error("Could not fetch '.well-known/nodeinfo':", error);
    return undefined;
  }

  for (const link of nodeInfoList.links) {
    if (
      /^http:\/\/nodeinfo\.diaspora\.software\/ns\/schema\/(1\.0|1\.1|2\.0|2\.1)/
        .test(
          link.rel,
        )
    ) {
      const nodeInfoResponse = await fetch(link.href);
      const nodeInfo = (await nodeInfoResponse.json()) as NodeInfo;

      return nodeInfo.software.name;
    }
  }

  // not found
  console.warn("No NodeInfo found for domain:", domain);
  return undefined;
};
