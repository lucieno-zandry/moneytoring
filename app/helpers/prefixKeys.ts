import { KeyValueObject } from "../../config/types";
import prefixString from "./prefixString";

export default (prefix: string, obj: KeyValueObject) => {
  const formated: KeyValueObject = {};

  for (let key in obj) {
    formated[prefixString(prefix, key)] = obj[key];
  }

  return formated;
};
