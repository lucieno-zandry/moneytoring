import { User } from "../config/types/models";
import validateObject from "./validateObject";

export const storageName = "user";

export function get(): null | User {
  const userString = sessionStorage.getItem(storageName);
  if (!userString) return null;

  const user: User = JSON.parse(userString);
  return validateObject(user, ["id", "email", "firstname", "name"])
    ? user
    : null;
}

export function set(user: User) {
  sessionStorage.setItem(storageName, JSON.stringify(user));
}

export function remove() {
  sessionStorage.removeItem(storageName);
}

export default {
  get,
  set,
  remove,
  storageName,
};
