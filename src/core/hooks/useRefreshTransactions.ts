import { getTransactions } from "../api/actions";
import useTransactions from "./useTransactions";

export default () => {
  const { setTransactions } = useTransactions();

  return () => {
    getTransactions().then((response) => {
      setTransactions(response.data.transactions);
    });
  };
};
