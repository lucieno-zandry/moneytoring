import { AxiosError } from "axios";
import { getAuth } from "../api/actions";
import sessionAuthActions from "../helpers/sessionAuthActions";
import sessionUserActions from "../helpers/sessionUserActions";
import useAuth from "./useAuth";
import toast from "react-hot-toast";

export default () => {
  const { setAuth } = useAuth();

  return () => {
    getAuth()
      .then((response) => {
        const { user } = response.data;
        setAuth(user);
        sessionUserActions.set(user);
      })
      .catch((error: AxiosError) => {
        if (error.status === 401) {
          sessionAuthActions.clear();
          setAuth(false);
        } else {
          toast.error(`Failed to authenticate: ${error.message}`);
        }
      });
  };
};
