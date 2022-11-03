import { AlertColor } from "@mui/material";
import create from "zustand";

type Options = {
  severity: AlertColor;
};

interface State {
  isToastOpen: boolean;
  setIsToastOpen: (isToastOpen: boolean) => void;
  toastText?: string;
  toastOptions?: Options;
  toast: (text: string, options?: Options) => void;
}

export const useToastStore = create<State>((set) => ({
  isToastOpen: false,
  setIsToastOpen: (isToastOpen: boolean) => set({ isToastOpen }),
  toast: (toastText: string, options?: Options) =>
    set({ toastText, toastOptions: options, isToastOpen: true }),
}));
