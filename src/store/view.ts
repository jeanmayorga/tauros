import create from "zustand";

interface State {
  view: string;
  setView: (newView: string) => void;
}

export const useViewStore = create<State>((set) => ({
  view: "home",
  setView: (newView: string) => set({ view: newView }),
}));
