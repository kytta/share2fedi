import { strings, defaultLanguage, languages } from "./translations";

export function useTranslations(language: string) {
	if (!(language in strings)) {
		language = defaultLanguage;
	}
	return function t(
		key: keyof (typeof strings)[typeof defaultLanguage],
	): string {
		return (
			strings[language as keyof typeof strings][key] ||
			strings[defaultLanguage][key] ||
			""
		);
	};
}

export function findBestLanguage(): string {
	const urlLanguage = new URLSearchParams(window.location.search).get("lang");
	if (urlLanguage && urlLanguage in languages) {
		return urlLanguage;
	}

	let browserLanguages = navigator.languages;
	if (!navigator.languages) browserLanguages = [navigator.language];
	for (const language of browserLanguages) {
		const locale = new Intl.Locale(language);
		const minimized = locale.minimize();

		for (const candidate of [locale.baseName, minimized.baseName]) {
			if (candidate in languages) {
				return candidate;
			}
		}
	}

	return defaultLanguage;
}

export function applyTranslations(language: string) {
	const t = useTranslations(language);

	for (const node of document.querySelectorAll("[data-translate]")) {
		const dataset = (node as HTMLElement).dataset;

		if (dataset.translateAttribute) {
			node.setAttribute(dataset.translateAttribute, t(dataset.translate!));
			continue;
		}

		let splitTranslated = t(dataset.translate!).split("{}");
		if (splitTranslated.length === 1) {
			node.innerHTML = t(dataset.translate!);
			continue;
		}
		// XXX: this is needed for the strings where the placholder sits at the very
		// beginning, which introduces phantom empty strings.
		splitTranslated = splitTranslated.filter((string) => string !== "");

		for (const child of node.childNodes) {
			if (child.nodeType === Node.TEXT_NODE) {
				child.textContent = splitTranslated.shift() || "";
			}
		}
	}
}
