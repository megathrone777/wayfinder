import { describe, expect, it } from "@jest/globals";

import { defaultLocale, isLocale, localeCookie, localeMeta, locales } from "../config";

describe("i18n config", () => {
  describe("locales", () => {
    it("contains en, cz and ru", () => {
      expect(locales).toEqual(["en", "cz", "ru"]);
    });

    it("uses en as the default locale", () => {
      expect(defaultLocale).toBe("en");
    });

    it("exposes the NEXT_LOCALE cookie name", () => {
      expect(localeCookie).toBe("NEXT_LOCALE");
    });
  });

  describe("localeMeta", () => {
    it("has an entry for every supported locale", () => {
      locales.forEach((locale) => {
        expect(localeMeta[locale]).toBeDefined();
        expect(localeMeta[locale].english).toBeTruthy();
        expect(localeMeta[locale].label).toBeTruthy();
      });
    });

    it("maps locales to their English name", () => {
      expect(localeMeta.en.english).toBe("English");
      expect(localeMeta.cz.english).toBe("Czech");
      expect(localeMeta.ru.english).toBe("Russian");
    });
  });

  describe("isLocale", () => {
    it("returns true for each supported locale", () => {
      expect(isLocale("en")).toBe(true);
      expect(isLocale("cz")).toBe(true);
      expect(isLocale("ru")).toBe(true);
    });

    it("returns false for an unsupported locale", () => {
      expect(isLocale("de")).toBe(false);
      expect(isLocale("EN")).toBe(false);
    });

    it("returns false for non-string values", () => {
      expect(isLocale(undefined)).toBe(false);
      expect(isLocale(null)).toBe(false);
      expect(isLocale(42)).toBe(false);
      expect(isLocale({})).toBe(false);
    });
  });
});
