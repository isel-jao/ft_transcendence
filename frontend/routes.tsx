import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Textsms";
import { FunctionComponent } from "react";
import Chat from "./pages/conversations";
import ChannelsIcon from "@mui/icons-material/ThreeP";
import Channels from "./pages/channels";
import Image from "next/image";

export interface Route {
  path: string;
  name: string;
  icon?: any;
  routes?: Route[];
}

export const routesBottom: Route[] = [
  {
    path: "/home",
    name: "Home",
    icon: <Image src="/icons/Home.svg" width={24} height={24} />,
  },
  {
    path: "/game",
    name: "Game",
    icon: <Image src="/icons/Game.svg" width={24} height={24} />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <Image src="/icons/Users.svg" width={24} height={24} />,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <Image src="/icons/Param.svg" width={24} height={24} />,
  },
  {
    path: "/logout",
    name: "Logout",
    icon: <Image src="/icons/Logout.svg" width={24} height={24} />,
  },
  {
    path: "/channels",
    name: "channels",
    icon: <ChannelsIcon />,
  },
];

export default routesBottom;
