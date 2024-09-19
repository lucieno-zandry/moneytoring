import { User } from "../config/types/models";
import sessionUserActions from "./sessionUserActions";
import storageTokenActions from "./storageTokenActions";

export default function (): false | User {
  const token = storageTokenActions.get();
  const user = sessionUserActions.get();
  if (!token || !user) return false;
  return user;
}
