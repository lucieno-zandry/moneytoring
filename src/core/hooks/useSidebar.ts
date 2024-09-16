import { create } from "zustand";
import {
  accounts,
  categories,
  dashboard,
  transactions,
} from "../config/links/pages";
import { SidebarItemProps } from "../../partials/Sidebar/SidebarItem/SidebarItem";

export type SidebarStore = {
  active: { index: number; link: string };
  setActive: (active: SidebarStore["active"]) => void;
  show: boolean;
  setShow: (show: boolean) => void;
  toggle: () => void;
};

export const sidebarItems: SidebarItemProps[] = [
  {
    icon: "home",
    title: "Dashboard",
    link: dashboard,
  },
  {
    icon: "cash-register",
    title: "Transactions",
    link: transactions,
  },
  {
    icon: "tasks",
    title: "Categories",
    link: categories,
  },
  {
    icon: "book",
    title: "Accounts",
    link: accounts,
  },
];

const getDefaultActive = () => {
  const link = location.pathname;
  if (link === dashboard) return { index: 0, link: dashboard };
  const index = sidebarItems.findIndex(
    (sidebarItem) => sidebarItem.link === link
  );
  return { index: index >= 0 ? index : 0, link };
};

const useSidebar = create<SidebarStore>((set) => ({
  active: getDefaultActive(),
  setActive: (active) => set((state) => ({ ...state, active })),
  show: false,
  setShow: (show) => set((state) => ({ ...state, show })),
  toggle: () => set((state) => ({ ...state, show: !state.show })),
}));

export default useSidebar;
