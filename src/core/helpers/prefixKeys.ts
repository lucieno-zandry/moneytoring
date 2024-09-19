import { JsObject } from "../config/types/variables";
import prefixString from "./prefixString";

export default (prefix: string, obj: JsObject) => {
  const formated: JsObject = {};

  for (let key in obj) {
    formated[prefixString(prefix, key)] = obj[key];
  }

  return formated;
};
