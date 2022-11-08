import React from "react";
import Nav from "./nav";
import SideNav from "./side-nav";
import StyledLayout from "./styles";
import { useRouter } from "next/router";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();

  const isFullPage =
    new RegExp(/^\/\d/).test(router.pathname) || router.pathname === "/login";

  return !isFullPage ? (
    <StyledLayout>
      <div className={`sidenav`}>
        <SideNav />
      </div>
      <div className={`main `}>
        <div className="nav">
          <Nav />
        </div>
        <div className={`router-view `}>{children}</div>
      </div>
    </StyledLayout>
  ) : (
    <>{children}</>
  );
};

export default Layout;
