import create from "zustand";

interface State {
  isAppDrawerOpen: boolean;
  setIsAppDrawerOpen: (isAppDrawerOpen: boolean) => void;
}

export const useAppDrawerStore = create<State>((set) => ({
  isAppDrawerOpen: false,
  setIsAppDrawerOpen: (isAppDrawerOpen: boolean) => set({ isAppDrawerOpen }),
}));
