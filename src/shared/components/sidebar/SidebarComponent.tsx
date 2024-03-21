"use client";
import { Button } from "@/components/ui/button";
import { useRouterHelper } from "@/shared/hooks/useRouterHelper";
import Link from "next/link";
import { Modal } from "../modal/Modal";

const SidebarComponent = () => {
  const routesWithoutHome = useRouterHelper().getRouteExcluding("Home");

  const actualRoute = useRouterHelper().getCurrentRoute();
  return (
    <section className="w-80 h-full py-10  flex flex-col border-r gap-4">
      <h4 className="font-bold text-3xl text-center">DASHBOARD</h4>
      <div className="flex flex-col h-full ">
        {routesWithoutHome.map((route, index) => (
          <Link
            href={route.path}
            key={index}
            className={`${
              actualRoute?.name === route.name ? "border" : ""
            } px-4 py-4`}
          >
            {route.name}
          </Link>
        ))}
      </div>
      <Modal />
    </section>
  );
};

export default SidebarComponent;
