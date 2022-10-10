import { AppProps } from "next/app";
import React from "react";
import { Button } from "@mui/material";
import Nav from "./nav";
import { darken, lighten } from "polished";
import styled, { StyledInterface } from "styled-components";

interface StyledLayoutProps {
  sideNavOpen: boolean;
  margin: number;
  radius: number;
}

const StyledLayout = styled.div<StyledLayoutProps>`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${(props) => props.theme.bg[props.theme.mode]};
  .main {
    width: 100%;
    margin-left: ${(props) =>
      (props.sideNavOpen ? 16 : 6) + 2 * props.margin}rem;
    position: relative;
    .nav {
      position: sticky;
      top: 0;
      height: 6rem;
    }
  }

  .sidenav {
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => (props.sideNavOpen ? 16 : 6) + props.margin}rem;
    height: 100%;
  }
  .nav,
  .sidenav {
    overflow: hidden;
    margin: ${(props) => props.margin}rem;
    background: ${(props) => lighten(0.05, props.theme.bg[props.theme.mode])};
    box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
    color: ${(props) => props.theme.text[props.theme.mode]};
    border-radius: 0.5rem;
  }
`;
interface Props extends AppProps {
  children?: React.ReactNode;
}

const defaultTheme: StyledLayoutProps = {
  sideNavOpen: true,
  margin: 0.5,
  radius: 0.5,
};

const Layout = ({ children }: Props) => {
  const [config, setConfig] = React.useState(defaultTheme);

  const toggleSideNav = () => {
    setConfig({ ...config, sideNavOpen: !config.sideNavOpen });
  };

  return (
    <StyledLayout {...defaultTheme}>
      <div className="sidenav">nav</div>

      <div className="main">
        <div className="nav">
          <div className="flex">
            <Button onClick={toggleSideNav}>toggle sidenav</Button>
            <div>{JSON.stringify(config)}</div>
          </div>
        </div>
        <div className="router-view">{children}</div>
      </div>
    </StyledLayout>
  );
};

export default Layout;
