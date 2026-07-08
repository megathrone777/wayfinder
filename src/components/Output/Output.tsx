"use client";
import React from "react";

import { useLayoutStore } from "@/store";
import { Container } from "@/ui";

import { Results } from "./Results";

import { wrapperClass } from "./Output.css";

const Output: React.FC = () => {
  const layoutView = useLayoutStore(({ view }) => view);

  return (
    <div className={wrapperClass[layoutView]}>
      <Container>
        <Results />
      </Container>
    </div>
  );
};

export { Output };
