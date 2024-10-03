import { create } from "zustand";
import { User } from "../config/types/models";
// import { fakeUser } from "../config/constants/fakes";
import sessionUserActions from "../helpers/sessionUserActions";
// import getDefaultAuth from "../helpers/getDefaultAuth";

type Auth = {
  user: false | User;
  setAuth: (auth: false | User) => void;
};

const middleWare = (newUser: Auth["user"]) => {
  if (!newUser) return;
  sessionUserActions.set(newUser);
};

const useAuth = create<Auth>((set) => ({
  user: false,
  // user: getDefaultAuth(),
  
  setAuth: (auth: false | User) =>
    set((state) => {
      const newState = { ...state, user: auth };
      middleWare(newState.user);
      return newState;
    }),
}));

export default useAuth;
