import { create } from "zustand";
import { User } from "../config/types/models";
import sessionUserActions from "../helpers/sessionUserActions";
import getDefaultAuth from "../helpers/getDefaultAuth";

type Auth = {
  user: false | User;
  setAuth: (auth: false | User) => void;
};

const middleWare = (newUser: Auth["user"]) => {
  const { set, remove } = sessionUserActions;
  newUser ? set({ ...newUser, id: 0 }) : remove();
};

const useAuth = create<Auth>((set) => ({
  user: getDefaultAuth(),
  setAuth: (auth: false | User) =>
    set((state) => {
      const newState = { ...state, user: auth };
      middleWare(newState.user);
      return newState;
    }),
}));

export default useAuth;
