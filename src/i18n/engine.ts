/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { strings, defaultLanguage, languages } from "./translations";

export function useTranslations(language: string) {
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
	const urlLang = new URLSearchParams(globalThis.location.search).get("lang");
	if (urlLang && urlLang in languages) {
		return urlLang;
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
	if (!(language in strings)) {
		language = defaultLanguage;
	}
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

	if (Intl.ListFormat) {
		const formatter = new Intl.ListFormat(language, {
			style: "short",
			type: "conjunction",
		});

		for (const node of document.querySelectorAll("[data-enumerate]")) {
			const dataset = (node as HTMLElement).dataset;
			node.innerHTML = formatter.format(dataset.enumerate!.split(","));
		}
	}

	document.documentElement.lang = language;
	document.documentElement.dir =
		languages[language as keyof typeof languages].dir;
}
