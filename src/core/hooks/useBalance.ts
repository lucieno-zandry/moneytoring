import { create } from "zustand";

type BalanceHook = {
  balance: number;
  setBalance: (balance: number) => void;
};

export default create<BalanceHook>((set) => ({
  balance: 0,
  setBalance: (balance) => set((state) => ({ ...state, balance })),
}));
