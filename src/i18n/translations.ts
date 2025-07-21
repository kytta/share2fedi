/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import ar from "./translations/ar.json";
import de from "./translations/de.json";
import en from "./translations/en.json";
import es from "./translations/es.json";
import et from "./translations/et.json";
import fr from "./translations/fr.json";
import nl from "./translations/nl.json";
import ru from "./translations/ru.json";
import ta from "./translations/ta.json";
import zhHans from "./translations/zh-Hans.json";

export const languages = {
	ar: { autonym: "العربية", dir: "rtl" },
	de: { autonym: "Deutsch", dir: "ltr" },
	en: { autonym: "English", dir: "ltr" },
	es: { autonym: "Español", dir: "ltr" },
	et: { autonym: "Eesti", dir: "ltr" },
	fr: { autonym: "Français", dir: "ltr" },
	nl: { autonym: "Nederlands", dir: "ltr" },
	ru: { autonym: "Русский", dir: "ltr" },
	ta: { autonym: "தமிழ்", dir: "ltr" },
	"zh-Hans": { autonym: "中文（简体）", dir: "ltr" },
};

export const strings: Record<keyof typeof languages, Record<string, string>> = {
	ar,
	de,
	en,
	es,
	et,
	fr,
	nl,
	ru,
	ta,
	"zh-Hans": zhHans,
} as const;

export const defaultLanguage: keyof typeof strings = "en";
