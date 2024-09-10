import { create } from "zustand";
import { User } from "../config/types/models";
import { fakeUser } from "../config/constants/fakes";

type Auth = {
    user: undefined | false | User;
}

type AuthActions = {
    setAuth: (auth: false | User) => void;
}

const useAuth = create<Auth & AuthActions>(set => ({
    user: fakeUser,
    setAuth: (auth: false | User) => set({user: auth})
}))

export default useAuth;