"use client";
import { useRouter } from "next/navigation";
import { useUserStore } from "../context/userStore";
import React, { useEffect } from "react";

export const ValidateAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  // Si el usuario está autenticado, renderiza los hijos
  return <>{children}</>;
};
