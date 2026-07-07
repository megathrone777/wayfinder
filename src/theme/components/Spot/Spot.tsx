import React from "react";

import { wrapperClass } from "./Spot.css";

import type { TProps } from "./Spot.types";

const Spot: React.FC<TProps> = ({ activity }) => <div className={`${wrapperClass} ${activity}`} />;

export { Spot };
