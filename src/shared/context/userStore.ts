import { create } from "zustand";
import { persist } from "zustand/middleware";

type userStore = {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
};

export const useUserStore = create<userStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: string) => set(() => ({ user })),
      clearUser: () => set(() => ({ user: null })),
    }),
    { name: "user-storage" }
  )
);