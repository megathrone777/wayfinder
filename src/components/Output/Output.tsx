import React from "react";

import { Container } from "@/ui";

import { wrapperClass } from "./Output.css";

const Output: React.FC = () => (
  <div className={wrapperClass}>
    <Container>Agent Output</Container>
  </div>
);

export { Output };
