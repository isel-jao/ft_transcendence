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
    icon: <Image src="/icons/home.svg" width={30} height={30} alt="home" />,
  },
  {
    path: "/game",
    name: "Game",
    icon: <Image src="/icons/game.svg" width={30} height={30} alt="home" />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <Image src="/icons/users.svg" width={30} height={30} alt="home" />,
  },
  {
    path: "/chat",
    name: "Chat",
    icon: <Image src="/icons/chat.svg" width={30} height={30} alt="home" />,
  },
];

export default routes;
