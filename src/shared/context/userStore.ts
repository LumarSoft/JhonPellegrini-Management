import { create } from "zustand";

type userStore = {
  user: string | null;
  setUser: (user: string) => void;
};

export const useUserStore = create<userStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
