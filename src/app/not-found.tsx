import React from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/ui";

const NotFound: React.FC = () => {
  const t = useTranslations("Error");

  return (
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
  );
};

export default NotFound;
