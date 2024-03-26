"use client";
import { useRouter } from "next/navigation";
import { useUserStore } from "../context/userStore";
import React, { useEffect, useState } from "react";

export const ValidateAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleUser = () => {
      if (user === null) {
        router.push("/");
      } else if (user === "") {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
      setIsLoading(false);
    };

    handleUser();
  }, [user, router]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
};