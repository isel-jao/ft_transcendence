import { ThemedStyledInterface } from "styled-components";
import { IconButton } from "@mui/material";
import { Menu, MenuOpen } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const StyledNav = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: ${(props) => props.theme.palette.success.main}; */
  padding: 0 1rem;
`;
interface NavProps {
  toggleOpen: () => void;
  open: boolean;
}

export const Nav = (props: NavProps) => {
  return (
    <StyledNav className="">
      <IconButton onClick={props.toggleOpen}>
        {props.open ? <MenuOpen /> : <Menu />}
      </IconButton>
    </StyledNav>
  );
};

export default Nav;
