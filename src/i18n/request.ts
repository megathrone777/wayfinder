import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import { defaultLocale, isLocale, localeCookie } from "./config";

export default getRequestConfig(async () => {
  const cookieValue = (await cookies()).get(localeCookie)?.value;
  const locale = isLocale(cookieValue) ? cookieValue : defaultLocale;

  return {
    locale,
    messages: (await import(`../dictionaries/${locale}.json`)).default,
  };
});
