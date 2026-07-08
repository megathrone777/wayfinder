import React from "react";

import { Agent, Output, ViewSwitcher } from "@/components";

const Page: React.FC = () => (
  <>
    <ViewSwitcher />
    <Agent />
    <Output />
  </>
);

export default Page;
