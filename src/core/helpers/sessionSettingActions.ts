import { STORAGE_SETTING_NAME } from "../config/constants/constants";
import { Setting } from "../config/types/models";
import validateObject from "./validateObject";

export function get(): Setting | null {
  const settingString = sessionStorage.getItem(STORAGE_SETTING_NAME);
  if (!settingString) return null;

  const setting: Setting = JSON.parse(settingString);
  return validateObject(setting, ["currency", "language"]) ? setting : null;
}

export function set(setting: Setting) {
  sessionStorage.setItem(STORAGE_SETTING_NAME, JSON.stringify(setting));
}

export default {
  get,
  set,
  STORAGE_SETTING_NAME,
};