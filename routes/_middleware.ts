import { FreshContext } from "$fresh/server.ts";
import { defaultLanguage, languages } from "$i18n/translations.ts";

interface State {
  languages: string[];
  prerenderLanguage: string;
}
const chooseLanguage = (localeTags: string[]): string => {
  for (const tag of localeTags) {
    const locale = new Intl.Locale(tag);
    const minimized = locale.minimize();

    for (const candidate of [locale.baseName, minimized.baseName]) {
      if (candidate in languages) {
        return candidate;
      }
    }
  }

  return defaultLanguage;
};

export function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const acceptLanguages = req.headers.get("Accept-Language")
    ?.split(",")
    .filter(Boolean)
    .map((tag) => tag.split(";")[0].trim())
    .filter((tag) => tag !== "*") ?? [];
  ctx.state.prerenderLanguage = chooseLanguage(acceptLanguages);

  return ctx.next();
}
