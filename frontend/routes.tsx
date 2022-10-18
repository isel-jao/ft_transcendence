import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
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
];

export default routes;
