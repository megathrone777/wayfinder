import React from "react";

import { Container } from "@/ui";

import { wrapperClass } from "./Canvas.css";

const Canvas: React.FC = () => (
  <div className={wrapperClass}>
    <Container>Canvas</Container>
  </div>
);

export { Canvas };
