import { AxiosError } from "axios";
import { getAuth } from "../api/actions";
import useAuth from "./useAuth";
import toast from "react-hot-toast";
import storageTokenActions from "../helpers/storageTokenActions";

export default () => {
  const { user, setAuth } = useAuth();

  return () => {
    getAuth()
      .then((response) => {
        const { user } = response.data;
        setAuth(user);
      })
      .catch((error: AxiosError) => {
        storageTokenActions.remove();
        setAuth(false);

        if (user) {
          location.reload();
        }
        
        if (error.status !== 401) {
          toast.error(`Failed to authenticate: ${error.message}`);
        }
      });
  };
};
