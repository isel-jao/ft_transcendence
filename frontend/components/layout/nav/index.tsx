import React, { useEffect } from "react";
import styled from "styled-components";
import { useProvider } from "../../provider";
const StyledNav = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

interface User {
  id: number;
  username: string;
}

interface Context {
  user: User;
}

export const Nav = () => {
  const context = useProvider<Context>();
  const { user } = context;
  return (
    <StyledNav className="">
      <div className="route-descreption">route descreption</div>
      <div className="ml-auto user-descreption">
        {user ? user.username : "user infos"}
      </div>
    </StyledNav>
  );
};

export default Nav;
