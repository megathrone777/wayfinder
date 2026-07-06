import React from "react";

import { Button } from "@/ui";

const NotFound: React.FC = () => (
  <div className="error">
    <h1 className="error__title">Page not found</h1>

    <Button
      href="/"
      size="normal"
      template="secondary"
    >
      Go to main page
    </Button>
  </div>
);

export default NotFound;
