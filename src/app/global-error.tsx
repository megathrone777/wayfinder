"use client";
import React from "react";

import { Button } from "@/ui";

const GlobalError: React.FC = () => (
  <html lang="en">
    <body>
      <div className="error">
        <h1 className="error__title">Page not found</h1>
        <Button href="/">Go to main page</Button>
      </div>
    </body>
  </html>
);

export default GlobalError;
