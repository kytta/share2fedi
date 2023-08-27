import { persistentAtom } from "@nanostores/persistent";

export const $locale = persistentAtom<string | undefined>("locale");
