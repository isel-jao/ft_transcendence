import Image from "next/image";

export interface Route {
  path: string;
  name: string;
  icon?: React.ReactNode;
  routes?: Route[];
}

const routes: Route[] = [
  {
    path: "/home",
    name: "Home",
    icon: <Image src="/Icons/Home.svg" width={24} height={24} />,
  },
  {
    path: "/game",
    name: "Game",
    icon: <Image src="/Icons/Game.svg" width={24} height={24} />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <Image src="/Icons/Users.svg" width={24} height={24} />,
  },
  {
    path: "/chat",
    name: "Chat",
    icon: <Image src="/Icons/Chat.svg" width={24} height={24} />,
  },
];

export const routesBottom: Route[] = [
  {
    path: "/profile",
    name: "Profile",
    icon: <Image src="/Icons/Param.svg" width={24} height={24} />,
  },
  {
    path: "/logout",
    name: "Logout",
    icon: <Image src="/Icons/Logout.svg" width={24} height={24} />,
  },
];

export default routes;
