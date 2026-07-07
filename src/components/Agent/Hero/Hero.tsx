import React from "react";

import { wrapperClass, hintClass, textClass, titleClass } from "./Hero.css";

const Hero: React.FC = () => (
  <div className={wrapperClass}>
    <p className={hintClass}>new session</p>
    <h1 className={titleClass}>Describe your trip.</h1>

    <p className={textClass}>
      One sentence of intent. The agent parses it, searches, and assembles a plan you can inspect
      and approve — step by step.
    </p>
  </div>
);

export { Hero };
