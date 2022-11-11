import Image from "next/image";

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
    path: "/chat",
    name: "Chat",
    icon: <Image src="/icons/Chat.svg" width={24} height={24} />,
  },
];

export const routesBottom: Route[] = [
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
];

export default routes;
