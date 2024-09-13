import { create } from "zustand";

type SearchStore = {
  search: string;
  setSearch: (search: string) => void;
};

const useSearch = create<SearchStore>((set) => ({
  search: "",
  setSearch: (search: string) =>
    set((state) => ({ ...state, search: search.toLowerCase() })),
}));

export default useSearch;

