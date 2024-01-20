/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import de from "./translations/de.json";
import en from "./translations/en.json";
import es from "./translations/es.json";
import fr from "./translations/fr.json";
import nl from "./translations/nl.json";
import ru from "./translations/ru.json";

export const languages = {
	en: { autonym: "English", dir: "ltr" },
	de: { autonym: "Deutsch", dir: "ltr" },
	es: { autonym: "Español", dir: "ltr" },
	fr: { autonym: "Français", dir: "ltr" },
	nl: { autonym: "Nederlands", dir: "ltr" },
	ru: { autonym: "Русский", dir: "ltr" },
};

export const strings: Record<keyof typeof languages, Record<string, string>> = {
	en,
	de,
	es,
	fr,
	nl,
	ru,
} as const;

export const defaultLanguage: keyof typeof strings = "en";
