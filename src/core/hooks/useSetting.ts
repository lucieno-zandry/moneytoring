import { create } from "zustand";
import { Setting } from "../config/types/models";
import { fakeSetting } from "../config/constants/fakes";
import sessionSettingActions from "../helpers/sessionSettingActions";
import { setLocale } from "react-i18nify";

type SettingStore = {
  setting: Setting;
  setSetting: (setting: Setting) => void;
};

const defaultSetting = sessionSettingActions.get() || fakeSetting;
setLocale(defaultSetting.language);

const middleWare = (
  newSetting: SettingStore["setting"],
  prevSetting: SettingStore["setting"]
) => {
  if (newSetting.language !== prevSetting.language) {
    setLocale(newSetting.language);
  }

  sessionSettingActions.set(newSetting);
};

const useSetting = create<SettingStore>((set) => ({
  setting: defaultSetting,
  setSetting: (setting) =>
    set((state) => {
      const newState = { ...state, setting };
      middleWare(newState.setting, state.setting);
      return newState;
    }),
}));

export default useSetting;
