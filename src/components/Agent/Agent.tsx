import React from "react";

import { Container } from "@/ui";

import { Chat } from "./Chat";
import { Heading } from "./Heading";
import { Hero } from "./Hero";

import { wrapperClass, contentClass, layoutClass } from "./Agent.css";

const Agent: React.FC = () => (
  <div className={wrapperClass}>
    <Heading />

    <div className={layoutClass}>
      <Container>
        <div className={contentClass}>
          <Chat>
            <Hero />
          </Chat>
        </div>
      </Container>
    </div>
  </div>
);

export { Agent };
