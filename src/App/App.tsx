import React, { PropsWithChildren } from 'react'
import LogoutDialog from '../partials/LogoutDialog/LogoutDialog';
import { Toaster } from 'react-hot-toast';
import useRefreshAuth from '../core/hooks/useRefreshAuth';
import ScreenLoader from '../partials/ScreenLoader/ScreenLoader';
import useAccounts from '../core/hooks/useAccounts';
import useAuth from '../core/hooks/useAuth';
import useCategories from '../core/hooks/useCategories';
import useRefreshAccounts from '../core/hooks/useRefreshAccounts';
import useRefreshCategories from '../core/hooks/useRefreshCategories';
import useTransactions from '../core/hooks/useTransactions';
// import useRefreshTransactions from '../core/hooks/useRefreshTransactions';
import { isFirstTime } from '../core/helpers/firstTimeActions';
import useSetting from '../core/hooks/useSetting';
import useRefreshSetting from '../core/hooks/useRefreshSetting';

const App = (props: PropsWithChildren) => {
    const { user } = useAuth();
    const { setting } = useSetting();
    const { accounts } = useAccounts();
    const { categories } = useCategories();
    const { transactions, setTransactions } = useTransactions();

    const refreshAuth = useRefreshAuth();
    const refreshAccounts = useRefreshAccounts();
    const refreshCategories = useRefreshCategories();
    // const refreshTransactions = useRefreshTransactions();
    const refreshSetting = useRefreshSetting();

    React.useEffect(refreshAuth, []);
    React.useEffect(() => {
        if (!user || user.id === 0) return;

        if (!setting.id) {
            refreshSetting();
        } else if (!accounts) {
            refreshAccounts();
        } else if (!categories) {
            refreshCategories();
        } else if (!transactions && !isFirstTime()) {
            setTransactions([]);
            // refreshTransactions();
        }
    }, [user, accounts, categories, setting]);

    return <>
        <LogoutDialog />
        <Toaster />
        <ScreenLoader />
        {props.children}
    </>
};

export default App;