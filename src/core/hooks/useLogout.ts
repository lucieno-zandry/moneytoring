import storageTokenActions from "../helpers/storageTokenActions";
import useAccounts from "./useAccounts";
import useAuth from "./useAuth";
import useCategories from "./useCategories";
import useTransactions from "./useTransactions";

export default function(){
    const {setCategories} = useCategories();
    const {setAuth} = useAuth();
    const {setTransactions} = useTransactions();
    const {setAccounts} = useAccounts();

    return () => {
        setCategories(null);
        setTransactions(null);
        setAccounts(null);
        setAuth(false);
        storageTokenActions.remove();
    }
}