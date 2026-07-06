import React from "react";

import { Container, StatusDot } from "@/ui";

import { Autonomy } from "./Autonomy";
import { Logo } from "./Logo";
import { Menu } from "./Menu";
import { Status } from "./Status";

import { wrapperClass, contentClass, layoutClass } from "./Header.css";

const Header: React.FC = () => (
  <div className={wrapperClass}>
    <Container>
      <div className={layoutClass}>
        <Logo />

        <div className={contentClass}>
          <StatusDot status="waiting" />

          <Menu>
            <Status />
            <Autonomy />
          </Menu>
        </div>
      </div>
    </Container>
  </div>
);

export { Header };
