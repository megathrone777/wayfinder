import React from "react";

import { Container } from "@/ui";

import { Results } from "./Results";

import { wrapperClass } from "./Output.css";

const Output: React.FC = () => (
  <div className={wrapperClass}>
    <Container>
      <Results />
    </Container>
  </div>
);

export { Output };
