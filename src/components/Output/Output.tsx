import React from "react";

import { Placeholder } from "./Placeholder";
import { Results } from "./Results";
import { Route } from "./Route";
import { Trip } from "./Trip";

const Output: React.FC = () => (
  <Results placeholder={<Placeholder />}>
    <Route />
    <Trip />
  </Results>
);

export { Output };
