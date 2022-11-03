import create from "zustand";

interface State {
  isAppLoading: boolean;
  setIsAppLoading: (isAppLoading: boolean) => void;
}

export const useAppLoadingStore = create<State>((set) => ({
  isAppLoading: false,
  setIsAppLoading: (isAppLoading: boolean) => set({ isAppLoading }),
}));
