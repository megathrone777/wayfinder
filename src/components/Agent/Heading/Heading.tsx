import React from "react";
import { useTranslations } from "next-intl";

import { useAgentStore } from "@/store";
import { Button, Container } from "@/ui";

import { Activity } from "./Activity";

import { wrapperClass, hintClass, layoutClass } from "./Heading.css";

import type { TProps } from "./Heading.types";

const Heading: React.FC<TProps> = ({ setMessages, stop }) => {
  const activity = useAgentStore(({ activity }) => activity);
  const t = useTranslations("Toolbar");

  const handleResetClick = (): void => {
    void stop();
    setMessages([]);
  };

  return (
    <div className={wrapperClass}>
      <Container>
        <div className={layoutClass}>
          {activity === "idle" ? <p className={hintClass}>{t("agentLane")}</p> : <Activity />}

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
