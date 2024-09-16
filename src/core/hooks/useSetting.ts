import { create } from "zustand";
import { Setting } from "../config/types/models";
import { fakeSetting } from "../config/constants/fakes";

type SettingStore = {
  setting: Setting;
  setSetting: (setting: Setting) => void;
};

const useSetting = create<SettingStore>((set) => ({
  setting: fakeSetting,
  setSetting: (setting) => set((state) => ({ ...state, setting })),
}));

export default useSetting;
