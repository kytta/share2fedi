/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Adds missing "https://" and ending slash to the URL
 *
 * @param url URL to normalize
 * @return normalized URL
 */
export const normalizeURL = (url: string): string => {
	if (!(url.startsWith("https://") || url.startsWith("http://"))) {
		url = "https://" + url;
	}
	if (!url.endsWith("/")) {
		url += "/";
	}
	return url;
};

export const getUrlDomain = (url: string | URL): string => {
	if (typeof url === "string") {
		url = url.trim();

		if (!/^https?:\/\//.test(url)) {
			url = `https://${url}`;
		}
	}

	return new URL(url).host;
};
