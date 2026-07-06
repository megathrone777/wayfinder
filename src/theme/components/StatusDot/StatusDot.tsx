import React from "react";

import { wrapperClass } from "./StatusDot.css";

import type { TProps } from "./StatusDot.types";

const StatusDot: React.FC<TProps> = ({ status }) => <div className={wrapperClass[status]} />;

export { StatusDot };
