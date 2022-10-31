import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Textsms";
import { FunctionComponent } from "react";
import Chat from "./pages/conversations";

export interface Route {
  path: string;
  name: string;
  icon?: any;
  routes?: Route[];
}

const routes: Route[] = [
  {
    path: "/home",
    name: "Home",
    icon: <HomeIcon />,
  },
  {
    path: "/about",
    name: "About",
    icon: <InfoIcon />,
  },
  {
    path: "/conversations",
    name: "Chat",
    icon: <ChatIcon />,
  },
];

export default routes;
