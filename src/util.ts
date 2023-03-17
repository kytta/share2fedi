export const extractHost = (url: string): string => {
	if (!(url.startsWith("https://") || url.startsWith("http://"))) {
		url = "https://" + url;
	}
	return new URL(url).host;
};
