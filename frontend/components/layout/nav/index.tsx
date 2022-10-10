import { AppProps } from "next/app";
import styled, { StyledInterface } from "styled-components";
import { IconButton } from "@mui/material";
import React from "react";
interface Props extends AppProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const StyledNav = styled.nav``;

export const Nav = (props?: Props) => {
  return (
    <StyledNav className={`${props?.className}`}>
      <nav></nav>
    </StyledNav>
  );
};

export default Nav;
