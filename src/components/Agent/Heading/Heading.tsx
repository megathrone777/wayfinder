import React from "react";

import { Button, Container } from "@/ui";

import { wrapperClass, hintClass, layoutClass } from "./Heading.css";

import type { TProps } from "./Heading.types";

const Heading: React.FC<TProps> = ({ setMessages, stop }) => {
  const handleResetClick = (): void => {
    void stop();
    setMessages([]);
  };

  return (
    <div className={wrapperClass}>
      <Container>
        <div className={layoutClass}>
          <p className={hintClass}>Agent lane</p>

          <Button
            iconId="refresh"
            onClick={handleResetClick}
            size="small"
            template="tertiary"
            type="button"
          >
            Reset
          </Button>
        </div>
      </Container>
    </div>
  );
};

export { Heading };
