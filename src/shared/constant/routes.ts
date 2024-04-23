export enum ERoutes {
  HOME = "/",
  DASHBOARD = "/dashboard",
  RECHAZOS = "/dashboard/rechazos",
}

export type TRoutes = "Home" | "Dashboard" | "Rechazos";

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
    subroutes: [{ name: "Rechazos", path: ERoutes.RECHAZOS }],
  },
];
