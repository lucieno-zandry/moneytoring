import { create } from "zustand";
import { User } from "../config/types/models";
import getDefaultAuth from "../helpers/getDefaultAuth";
import sessionUserActions from "../helpers/sessionUserActions";

type Auth = {
  user: false | User;
  setAuth: (auth: false | User) => void;
};

const useAuth = create<Auth>((set) => ({
  user: getDefaultAuth(),
  setAuth: (auth: false | User) => {
    auth ? sessionUserActions.set(auth) : sessionUserActions.remove();
    set({ user: auth });
  },
}));

export default useAuth;
