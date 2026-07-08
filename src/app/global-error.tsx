"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/ui";

const GlobalError: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations("Error");

  return (
    <html lang={locale}>
      <body>
        <div className="error">
          <h1 className="error__title">{t("title")}</h1>

          <Button
            href="/"
            size="normal"
            template="tertiary"
          >
            {t("button")}
          </Button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
