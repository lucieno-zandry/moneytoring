import { allTransactionsHistory } from "../api/actions";
import useTransactionsHistory from "./useTransactionsHistory";

export default function () {
  const { setTransactionsHistory } = useTransactionsHistory();

  return () => {
    allTransactionsHistory().then((response) => {
      setTransactionsHistory(response.data);
    });
  };
}
