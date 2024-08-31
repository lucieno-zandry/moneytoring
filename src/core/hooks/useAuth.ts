import React from "react";
import { AuthContext } from "../contexts/contexts";

const useAuth = () => {
  return React.useContext(AuthContext);
};

export default useAuth;
