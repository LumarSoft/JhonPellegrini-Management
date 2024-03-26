import { usePathname } from "next/navigation";
import { IRoutes, ROUTES } from "../constant/routes";

export const useRouterHelper = () => {
  const pathname = usePathname();

  const getCurrentRoute = () => {
    return ROUTES.find((route) => route.path === pathname);
  };

  const getRouteExcluding = (routeToExclude: string) => {
    return ROUTES.filter((route) => route.name !== routeToExclude);
  };

  const getOneRoute = (routeName: string) => {
    return ROUTES.find((route) => route.path === routeName);
  };

  return {
    getCurrentRoute,
    getRouteExcluding,
    getOneRoute,
  };
};
