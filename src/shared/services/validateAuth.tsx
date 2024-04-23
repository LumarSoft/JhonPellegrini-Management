"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../context/userStore";
import SyncLoader from "react-spinners/SyncLoader";

export const ValidateAuth = ({ children }: { children: React.ReactNode }) => {
  const userStore = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const user = await userStore.loadUser();
      if (user === null) router.push("/");
      setLoading(false);
    };

    loadUser();
  }, [userStore, router]);

  if (loading) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <SyncLoader color="white" />
      </main>
    );
  }

  return <>{children}</>;
};