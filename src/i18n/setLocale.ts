"use server";
import { cookies } from "next/headers";

import { isLocale, localeCookie, type TLocale } from "./config";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const setLocale = async (locale: TLocale): Promise<void> => {
  if (!isLocale(locale)) return;

  (await cookies()).set(localeCookie, locale, {
    maxAge: ONE_YEAR_SECONDS,
    path: "/",
    sameSite: "lax",
  });
};

export { setLocale };
