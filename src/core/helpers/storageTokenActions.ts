import { AUTHORIZATION_TOKEN_NAME } from "../config/constants/constants";

export function get() {
  return localStorage.getItem(AUTHORIZATION_TOKEN_NAME);
}

export function set(token: string) {
  localStorage.setItem(AUTHORIZATION_TOKEN_NAME, token);
}

export function remove() {
  localStorage.removeItem(AUTHORIZATION_TOKEN_NAME);
}

export default {
  get,
  set,
  remove,
};
