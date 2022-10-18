import { ThemedStyledInterface } from "styled-components";
import { IconButton } from "@mui/material";
import { Menu, MenuOpen } from "@mui/icons-material";
import React from "react";
import { Theme } from "../../globalstyles";
import styled from "styled-components";
// const styled: ThemedStyledInterface<Theme> =
//   require("styled-components").default;

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
    <StyledNav className="debug">
      <IconButton onClick={props.toggleOpen}>
        <div className="text-primary">
          {props.open ? <MenuOpen /> : <Menu />}
        </div>
      </IconButton>
    </StyledNav>
  );
};

export default Nav;
