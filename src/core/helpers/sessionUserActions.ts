import { STORAGE_USER_NAME } from "../config/constants/constants";
import { User } from "../config/types/models";
import validateObject from "./validateObject";

export function get(): null | User {
  const userString = sessionStorage.getItem(STORAGE_USER_NAME);
  if (!userString) return null;

  const user: User = JSON.parse(userString);
  return validateObject(user, ["email", "firstname", "name"])
    ? user
    : null;
}

export function set(user: User) {
  sessionStorage.setItem(STORAGE_USER_NAME, JSON.stringify(user));
}

export function remove() {
  sessionStorage.removeItem(STORAGE_USER_NAME);
}

export default {
  get,
  set,
  remove,
};
