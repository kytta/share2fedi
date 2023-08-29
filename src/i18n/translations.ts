import de from "./translations/de.json";
import en from "./translations/en.json";
import es from "./translations/es.json";
import fr from "./translations/fr.json";
import ru from "./translations/ru.json";

export const languages = {
	en: "English",
	de: "Deutsch",
	es: "Español",
	fr: "Français",
	ru: "Русский",
};

export const strings: Record<keyof typeof languages, Record<string, string>> = {
	en,
	de,
	es,
	fr,
	ru,
} as const;

export const defaultLanguage: keyof typeof strings = "en";
