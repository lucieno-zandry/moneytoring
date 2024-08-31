import React from "react";
import { User } from "../config/types/models";

export const AuthContext = React.createContext({
  user: undefined as undefined | false | User,
  setUser: (user: User | false) => {
    user;
  },
});