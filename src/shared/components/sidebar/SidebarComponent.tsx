"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserStore } from "@/shared/context/userStore";
import { useRouterHelper } from "@/shared/hooks/useRouterHelper";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { IRoutes } from "@/shared/constant/routes";
import { RiLogoutBoxLine } from "react-icons/ri";

export const SidebarComponent = () => {
  const routesWithoutHome = useRouterHelper().getRouteExcluding("Home");
  const actualRoute = useRouterHelper().getCurrentRoute();
  const { clearUser } = useUserStore();

  return (
    <section>
      {/* responsive */}
      <div className="w-screen h-20 flex items-center px-4 justify-between border-b lg:hidden">
        <h1 className="text-2xl tracking-tighter">{actualRoute?.name}</h1>
        <div className="flex items-center gap-4">
          <LogoutModal clearUser={clearUser} />
          <DropDown routes={routesWithoutHome} />
        </div>
      </div>

      {/* Desktop */}
      <div className="h-screen w-80 border-r hidden lg:flex flex-col py-10 gap-4">
        <h4 className="font-bold text-3xl text-center">DASHBOARD</h4>
        <div className="flex flex-col h-full ">
          {routesWithoutHome.map((route, index) => (
            <Link
              href={route.path}
              key={index}
              className={`${
                actualRoute?.name === route.name ? "border border-x-0" : ""
              } px-4 py-4`}
            >
              {route.name}
            </Link>
          ))}
        </div>
        <LogoutModal clearUser={clearUser} />
      </div>
    </section>
  );
};

const DropDown = ({ routes }: { routes: IRoutes[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <RxHamburgerMenu className="text-2xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {routes.map((route, index) => (
          <Link href={route.path} key={index}>
            <DropdownMenuItem>{route.name}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const LogoutModal = ({ clearUser }: { clearUser: () => void }) => {
  const handleLogout = () => {
    clearUser();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hidden lg:block">
        Cerrar sesion
      </AlertDialogTrigger>
      <AlertDialogTrigger className="block lg:hidden text-2xl">
        <RiLogoutBoxLine />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cerrar sesion</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estas seguro que deseas cerrar sesion?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
