import { createSetting, getSetting } from "../api/actions";
import { Setting } from "../config/types/models";
import useSetting from "./useSetting";

export default () => {
  const { setting, setSetting } = useSetting();

  return async () => {
    getSetting().then((response) => {
      let newSetting = response.data.setting as Setting | null;

      if (newSetting) {
        setSetting(newSetting);
        return;
      }

      createSetting({
        currency: setting.currency,
        language: setting.language,
      }).then((response) => {
        newSetting = response.data.setting as Setting;
        setSetting(newSetting);
      });
    });
  };
};
