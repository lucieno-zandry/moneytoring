import { create } from "zustand";

type HookProps = {
  isLoggingOut: boolean;
  toggleLoggingOut: () => void;
};

const useIsLoggingOut = create<HookProps>((set) => ({
  isLoggingOut: false,
  toggleLoggingOut: () =>
    set((state) => ({ ...state, isLoggingOut: !state.isLoggingOut })),
}));

export default useIsLoggingOut;