import { KeyValueObject } from "../../config/types";
import getName from "./unPrefix";

export default <T>(obj: T) => {
  const formated: KeyValueObject = {};

  for (let key in obj) {
    formated[getName(key)] = obj[key];
  }

  return formated as T;
};
