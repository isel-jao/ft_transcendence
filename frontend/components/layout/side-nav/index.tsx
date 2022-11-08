import React from "react";
import routes from "../../../routes";
import RouterLink from "./router-link";
import Image from "next/image";
import StyledNav from "./style";

const settingRoute = {
  path: "/settings",
  name: "Settings",
  icon: (
    <Image src="/icons/settings.svg" width={30} height={30} alt="settings" />
  ),
};
const logoutRoute = {
  path: "/logout",
  name: "Logout",
  icon: <Image src="/icons/logout.svg" width={30} height={30} alt="home" />,
};
export const SideNav = () => {
  return (
    <StyledNav className={``}>
      <div className="main-links">
        <div className="logo ">
          <Image src="/logo.svg" width={60} height={60} alt="logo" />
        </div>
        <div className="h-2"></div>
        {routes.map((route, index) => {
          return <RouterLink route={route} key={index} />;
        })}
      </div>
      <div className="other-links">
        <RouterLink route={settingRoute} />
        <RouterLink route={logoutRoute} />
      </div>
    </StyledNav>
  );
};

export default SideNav;
