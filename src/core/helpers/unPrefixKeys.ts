import { JsObject } from "../config/types/variables";
import getName from "./unPrefix";

export default <T>(obj: T) => {
  const formated: JsObject = {};

  for (let key in obj) {
    formated[getName(key)] = obj[key];
  }

  return formated as T;
};
