const locales = ["en", "cz", "ru"] as const;

type TLocale = (typeof locales)[number];

const defaultLocale: TLocale = "en";
const localeCookie: string = "NEXT_LOCALE";

const localeMeta: Record<TLocale, { english: string; label: string }> = {
  cz: { english: "Czech", label: "Čeština" },
  en: { english: "English", label: "English" },
  ru: { english: "Russian", label: "Русский" },
};

const isLocale = (value: unknown): value is TLocale => locales.includes(value as TLocale);

export { defaultLocale, isLocale, localeCookie, localeMeta, locales, type TLocale };
