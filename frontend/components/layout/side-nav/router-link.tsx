import routes, { Route } from "../../../routes";
import { useRouter } from "next/router";
import Link from "next/link";

const RouterLink = ({ route }: { route: Route }) => {
  const router = useRouter();
  const isActive = router.pathname === route.path;
  return (
    <Link href={route.path}>
      <div className={` link ${isActive && "contained"}`}>
        <div className="icon">{route.icon}</div>
      </div>
    </Link>
  );
};

export default RouterLink;
