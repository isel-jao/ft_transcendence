import React from "react";
import styled from "styled-components";
import routes, { Route } from "../../../routes";
import { useRouter } from "next/router";
import Link from "next/link";
import { darken, lighten, rgba } from "polished";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .logo {
    display: flex;
    align-items: center;
    height: 5rem;
    font-size: 2rem;
    text-transform: capitalize;
    width: 16rem;
    .shape {
      width: 6rem;
      text-align: center;
    }
    .name {
      width: 10rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }
  .link {
    display: flex;
    margin-inline: 1rem;
    transition: width 0.3s ease, padding-left 0.3s ease;
    border-radius: 0.5rem;
    cursor: pointer;
    height: 3rem;
    align-items: center;
    &:hover {
      padding-left: 0.5rem;
    }
    &:active {
      background-color: ${(props) =>
        rgba(props.theme.palette.primary.main, 0.2)};
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 4rem;
      min-width: 4rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }
    .name {
      height: 100%;
      display: flex;
      width: 0rem;
      align-items: center;
      margin-right: 1rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }
  .contained {
    color: ${(props) => props.theme.text.dark};
    background-color: ${(props) => props.theme.palette.primary.main};
    &:active {
      background-color: ${(props) =>
        darken(0.05, props.theme.palette.primary.main)};
    }
  }
  &:hover,
  &.open {
    .logo {
      .name {
        opacity: 1;
      }
    }
    .link {
      overflow: hidden;
      .icon {
        width: 5rem;
      }
      .name {
        opacity: 1;
      }
    }
  }
`;
interface NavProps {
  open: boolean;
}

const RouterLink = ({ route }: { route: Route }) => {
  const router = useRouter();
  const isActive = router.pathname === route.path;
  return (
    <Link href={route.path}>
      <div className={` link ${isActive && "contained"}`}>
        <div className="icon">{route.icon}</div>
        <div className="name">{route.name}</div>
      </div>
    </Link>
  );
};

export const SideNav = ({ open }: NavProps) => {
  return (
    <StyledNav className={` ${open && "open"}`}>
      <div className="logo text-primary">
        <div className="shape">logo</div>
        <div className="name">Pong</div>
      </div>
      <div className="h-2"></div>
      {routes.map((route, index) => {
        return <RouterLink route={route} key={index} />;
      })}
    </StyledNav>
  );
};

export default SideNav;
