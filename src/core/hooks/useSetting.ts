import { create } from "zustand";
import { Setting } from "../config/types/models";
import { fakeSetting } from "../config/constants/fakes";
import sessionSettingActions from "../helpers/sessionSettingActions";

type SettingStore = {
  setting: Setting;
  setSetting: (setting: Setting) => void;
};

const defaultSetting = sessionSettingActions.get() || fakeSetting;

const useSetting = create<SettingStore>((set) => ({
  setting: defaultSetting,
  setSetting: (setting) => {
    sessionSettingActions.set(setting);
    set((state) => ({ ...state, setting }));
  },
}));

export default useSetting;
