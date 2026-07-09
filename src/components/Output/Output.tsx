import React from "react";

import { Results } from "./Results";
import { Route } from "./Route";
import { Trip } from "./Trip";

const Output: React.FC = () => (
  <Results>
    <Route />
    <Trip />
  </Results>
);

export { Output };
