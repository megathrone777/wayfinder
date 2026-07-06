import React from "react";

import { Button, Container } from "@/ui";

import { wrapperClass, hintClass } from "./Heading.css";

const Heading: React.FC = () => (
  <div className={wrapperClass}>
    <Container>
      <p className={hintClass}>Agent lane</p>

      <Button
        iconId="refresh"
        size="small"
        template="tertiary"
        type="button"
      >
        Reset
      </Button>
    </Container>
  </div>
);

export { Heading };
