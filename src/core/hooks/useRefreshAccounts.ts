import { getAccounts } from "../api/actions";
import { Account } from "../config/types/models";
import useAccounts from "./useAccounts";
import useAuth from "./useAuth";

export default function () {
  const { user } = useAuth();
  const { setAccounts } = useAccounts();

  return () => {
    if (!user) return;

    getAccounts().then((response) => {
      const accounts = response.data.accounts as Account[];
      setAccounts(accounts);
    });
  };
}
