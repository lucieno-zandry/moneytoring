import { JsObject } from "../config/types/variables";
import getName from "./getName";

export default (obj: JsObject) => {
  const formated: JsObject = {};

  for (let key in obj) {
    formated[getName(key)] = obj[key];
  }

  return formated;
};
