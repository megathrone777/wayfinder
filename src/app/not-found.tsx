import React from "react";

import { Button } from "@/ui";

const Page: React.FC = () => (
  <div className="error">
    <h1 className="error__title">Page not found</h1>
    <Button href="/">Go to main page</Button>
  </div>
);

export default Page;
