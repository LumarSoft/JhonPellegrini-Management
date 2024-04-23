import { create } from "zustand";
import { persist } from "zustand/middleware";

type userStore = {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
  loadUser: () => Promise<string | null>;
};

export const useUserStore = create<userStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: string) => set({ user }),
      clearUser: () => set({ user: null }),
      loadUser: async () => {
        const storageItem = localStorage.getItem("user-storage");
        const { state } = storageItem
          ? JSON.parse(storageItem)
          : { state: null };
        const user = state?.user;
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    { name: "user-storage" }
  )
);
