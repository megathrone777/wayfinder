import React from "react";

import { Logo } from "@/components";
import { Container } from "@/ui";

import { Activity } from "./Activity";
import { Autonomy } from "./Autonomy";
import { Menu } from "./Menu";

import { wrapperClass, layoutClass } from "./Header.css";

const Header: React.FC = () => (
  <div className={wrapperClass}>
    <Container>
      <div className={layoutClass}>
        <Logo />

        <Menu>
          <Activity />
          <Autonomy />
        </Menu>
      </div>
    </Container>
  </div>
);

export { Header };
