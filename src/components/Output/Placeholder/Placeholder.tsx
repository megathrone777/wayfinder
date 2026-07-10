import React from "react";

import { wrapperClass, logoClass, iconClass, textClass, titleClass } from "./Placeholder.css";

const Placeholder: React.FC = () => (
  <div className={wrapperClass}>
    <div className={logoClass}>
      <div className={iconClass} />
    </div>

    <h6 className={titleClass}>The itinerary assembles here</h6>

    <p className={textClass}>
      Flights, stays, a day-by-day plan and the route render live as the agent works.
    </p>
  </div>
);

export { Placeholder };
