import React from "react";
import { useTranslations } from "next-intl";

import { Button, Container } from "@/ui";

import { wrapperClass, hintClass, layoutClass } from "./Heading.css";

import type { TProps } from "./Heading.types";

const Heading: React.FC<TProps> = ({ setMessages, stop }) => {
  const t = useTranslations("Toolbar");

  const handleResetClick = (): void => {
    void stop();
    setMessages([]);
  };

  return (
    <div className={wrapperClass}>
      <Container>
        <div className={layoutClass}>
          <p className={hintClass}>{t("agentLane")}</p>

          <Button
            iconId="refresh"
            onClick={handleResetClick}
            size="small"
            template="tertiary"
            type="button"
          >
            {t("reset")}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export { Heading };
