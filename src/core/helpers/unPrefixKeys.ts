import { JsObject } from "../config/types/variables";
import getName from "./getName";

export default <T>(obj: T) => {
  const formated: JsObject = {};

  for (let key in obj) {
    formated[getName(key)] = obj[key];
  }

  return formated as T;
};
