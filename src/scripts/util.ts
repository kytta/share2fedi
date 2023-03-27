/*!
 * © 2023 Nikita Karamov
 * Licensed under AGPL v3 or later
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
