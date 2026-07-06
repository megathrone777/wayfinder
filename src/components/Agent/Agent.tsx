import React from "react";

import { Chat } from "./Chat";
import { Heading } from "./Heading";

import { wrapperClass } from "./Agent.css";

const Agent: React.FC = () => (
  <div className={wrapperClass}>
    <Heading />
    <Chat />
  </div>
);

export { Agent };
