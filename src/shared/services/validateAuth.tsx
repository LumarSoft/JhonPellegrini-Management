"use client";
import { useRouter } from "next/navigation";
import { useUserStore } from "../context/userStore";
import React, { useEffect } from "react";

export const ValidateAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || user === "") {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }, [user, router]);

  return <>{children}</>;
};
