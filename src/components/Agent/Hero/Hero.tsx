import React from "react";
import { useTranslations } from "next-intl";

import { wrapperClass, hintClass, textClass, titleClass } from "./Hero.css";

const Hero: React.FC = () => {
  const t = useTranslations("Hero");

  return (
    <div className={wrapperClass}>
      <p className={hintClass}>{t("hint")}</p>
      <h1 className={titleClass}>{t("title")}</h1>
      <p className={textClass}>{t("description")}</p>
    </div>
  );
};

export { Hero };
