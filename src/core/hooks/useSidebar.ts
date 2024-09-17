import { create } from "zustand";

export type SidebarStore = {
  show: boolean;
  setShow: (show: boolean) => void;
  toggle: () => void;
};

const useSidebar = create<SidebarStore>((set) => ({
  show: false,
  setShow: (show) => set((state) => ({ ...state, show })),
  toggle: () => set((state) => ({ ...state, show: !state.show })),
}));

export default useSidebar;
