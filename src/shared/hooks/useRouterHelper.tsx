import { usePathname } from "next/navigation";
import { IRoutes, ROUTES } from "../constant/routes";

export const useRouterHelper = () => {
  const pathname = usePathname();

  const getCurrentRoute = () => {
    const route = ROUTES.find((route) => route.path === pathname);
    if (route) return route;

    for (const parentRoute of ROUTES) {
      if (parentRoute.subroutes) {
        const subroute = parentRoute.subroutes.find(
          (subroute) => pathname.startsWith(parentRoute.path) && pathname.includes(subroute.path)
        );
        if (subroute) return subroute;
      }
    }

    return null;
  };

  const getRouteExcluding = (routeToExclude: string) => {
    return ROUTES.filter((route) => route.name !== routeToExclude);
  };

  const getOneRoute = (routeName: string) => {
    return ROUTES.find((route) => route.path === routeName);
  };

  return { getCurrentRoute, getRouteExcluding, getOneRoute };
};