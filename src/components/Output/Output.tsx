import React from "react";

import { Results } from "./Results";
import { RouteCanvas } from "./RouteCanvas";
import { Trip } from "./Trip";

const Output: React.FC = () => (
  <Results>
    <RouteCanvas />
    <Trip />
  </Results>
);

export { Output };