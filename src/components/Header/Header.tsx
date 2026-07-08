import React from "react";

import { Logo } from "@/components";
import { Container } from "@/ui";

import { Activity } from "./Activity";
import { Autonomy } from "./Autonomy";
import { Language } from "./Language";
import { Menu } from "./Menu";
import { Toolbar } from "./Toolbar";

import { wrapperClass, contentClass, layoutClass } from "./Header.css";

const Header: React.FC = () => (
  <div className={wrapperClass}>
    <Container>
      <div className={layoutClass}>
        <Logo />

        <div className={contentClass}>
          <Toolbar>
            <Language />
          </Toolbar>

          <Menu>
            <Activity />
            <Autonomy />
          </Menu>
        </div>
      </div>
    </Container>
  </div>
);

export { Header };
