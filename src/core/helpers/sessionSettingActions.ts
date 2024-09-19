import { Setting } from "../config/types/models";
import validateObject from "./validateObject";

export const sessionName = "setting";

export function get(): Setting | null {
  const settingString = sessionStorage.getItem(sessionName);
  if (!settingString) return null;

  const setting: Setting = JSON.parse(settingString);
  return validateObject(setting, ["currency", "language"]) ? setting : null;
}

export function set(setting: Setting) {
  sessionStorage.setItem(sessionName, JSON.stringify(setting));
}

export default {
  get,
  set,
  sessionName,
};
