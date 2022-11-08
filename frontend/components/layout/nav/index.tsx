import React from "react";
import styled from "styled-components";
import axios from "axios";

const StyledNav = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

interface User {
  id: number;
  userName: string;
}

export const Nav = () => {
  const [user, setUser] = React.useState<User | null>(null);
  return (
    <StyledNav className="">
      <div className="route-descreption">route descreption</div>
      <div className="user-descreption">
        {user ? user.userName : "user infos"}
      </div>
    </StyledNav>
  );
};

export default Nav;
