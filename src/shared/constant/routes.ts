export enum ERoutes {
  HOME = "/",
  DASHBOARD = "/dashboard",
  RECHAZOS = "/dashboard/rechazos",
  BLACKLIST = "/dashboard/blacklist",
  CLIENTES = "/dashboard/clientes",
}

export type TRoutes =
  | "Home"
  | "Dashboard"
  | "Rechazos"
  | "Blacklist"
  | "Clientes";

export interface IRoutes {
  name: TRoutes;
  path: string;
  subroutes?: IRoutes[];
}

export const ROUTES: IRoutes[] = [
  { name: "Home", path: ERoutes.HOME },
  {
    name: "Dashboard",
    path: ERoutes.DASHBOARD,
    subroutes: [
      { name: "Rechazos", path: ERoutes.RECHAZOS },
      { name: "Blacklist", path: ERoutes.BLACKLIST },
      { name: "Clientes", path: ERoutes.CLIENTES },
    ],
  },
];
