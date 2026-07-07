import React from "react";

import { Button, Container } from "@/ui";

import { wrapperClass, hintClass, layoutClass } from "./Heading.css";

const Heading: React.FC = () => (
  <div className={wrapperClass}>
    <Container>
      <div className={layoutClass}>
        <p className={hintClass}>Agent lane</p>

        <Button
          iconId="refresh"
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

export { Heading };
