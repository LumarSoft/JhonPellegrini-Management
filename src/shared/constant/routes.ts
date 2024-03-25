export enum ERoutes {
  HOME = "/",
  DASHBOARD = "/dashboard",
}

export type TRoutes = "Home" | "Dashboard";

export interface IRoutes {
  name: TRoutes;
  path: string;
}

export const ROUTES: IRoutes[] = [
  { name: "Home", path: ERoutes.HOME },
  { name: "Dashboard", path: ERoutes.DASHBOARD },
];
