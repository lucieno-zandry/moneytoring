import { create } from "zustand";
import { User } from "../config/types/models";
// import { fakeUser } from "../config/constants/fakes";
import getDefaultAuth from "../helpers/getDefaultAuth";

type Auth = {
  user: false | User;
  setAuth: (auth: false | User) => void;
};

const useAuth = create<Auth>((set) => ({
  // user: false,
  user: getDefaultAuth(),
  setAuth: (auth: false | User) => set({ user: auth }),
}));

export default useAuth;