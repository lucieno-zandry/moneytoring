import { User } from "../config/types/models";
import sessionUserActions from "./sessionUserActions";
import storageTokenActions from "./storageTokenActions";

export function store(user: User, token: string) {
  sessionUserActions.set(user);
  storageTokenActions.set(token);
}

export function clear() {
  sessionUserActions.remove();
  storageTokenActions.remove();
}

export default {
  store,
  clear,
};
