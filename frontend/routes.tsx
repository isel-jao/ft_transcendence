import { Home, Game } from "./components/Icons";

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
    icon: <img src={Home} />,
  },
  {
    path: "/game",
    name: "Game",
    icon: <img src={Game} />,
  },
];

export default routes;
