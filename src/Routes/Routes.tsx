import React from "react";
import { AnimatePresence } from "framer-motion";
import App from "../App/App";
import { Route, Routes, useLocation } from "react-router-dom";
import Backoffice from "../App/Backoffice/Backoffice";
import Dashboard from "../App/Backoffice/Dashboard/Dashboard";
import Transactions from "../App/Backoffice/Transactions/Transactions";
import Categories from "../App/Backoffice/Categories/Categories";
import Accounts from "../App/Backoffice/Accounts/Accounts";
import Settings from "../App/Backoffice/Settings/Settings";
import Account from "../App/Backoffice/Settings/Account/Account";
import Profile from "../App/Backoffice/Settings/Profile/Profile";
import Preferences from "../App/Backoffice/Settings/Preferences/Preferences";
import Auth from "../App/Auth/Auth";
import Confirmation from "../App/Auth/Confirmation/Confirmation";
import Setup from "../App/Setup/Setup";
import Login from "../App/Auth/Login/Login";
import Signup from "../App/Auth/Signup/Signup";
import PasswordForgotten from "../App/Auth/PasswordForgotten/PasswordForgotten";
import PasswordReset from "../App/Auth/PasswordReset/PasswordReset";
import LandingPage from "../App/LandingPage/LandingPage";
import useAccounts from "../core/hooks/useAccounts";
import useCategories from "../core/hooks/useCategories";
import { accountsSetup, categoriesSetup, dashboard, emailConfirmation, loginPage, transactionsSetup } from "../core/config/links/pages";
import useAuth from "../core/hooks/useAuth";
import RouteWatch, { RouteShieldProps } from "../partials/RouteWatch/RouteWatch";
import AccountCreation from "../App/Setup/AccountCreation/AccountCreation";
import CategoryCreation from "../App/Setup/CategoryCreation/CategoryCreation";
import TransactionCreation from "../App/Setup/TransactionCreation/TransactionCreation";
import { isFirstTime } from "../core/helpers/firstTimeActions";
import useTransactions from "../core/hooks/useTransactions";

const AppRoutes = () => {
    const location = useLocation();

    const { user } = useAuth();
    const { accounts } = useAccounts();
    const { categories } = useCategories();
    const { transactions } = useTransactions();

    const configurationRedirections: RouteShieldProps['otherRedirections'] = React.useMemo(() => [
        {
            pathname: emailConfirmation,
            condition: Boolean(user && user.email_verified_at === null),
        },
        {
            pathname: accountsSetup,
            condition: Boolean(accounts && accounts.length === 0),
        },
        {
            pathname: categoriesSetup,
            condition: Boolean(categories && categories.length === 0),
        },
        {
            pathname: transactionsSetup,
            condition: isFirstTime() && Boolean(user && accounts && categories && !transactions),
        }
    ], [user, accounts, categories, transactions]);

    const routeWatchParams = React.useMemo(() => ({
        authState: Boolean(user),
        authenticatedHomepage: dashboard,
        loginPage: loginPage,
        otherRedirections: configurationRedirections
    }), [user, configurationRedirections]);

    return <App>
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.key}>
                <Route element={<RouteWatch {...routeWatchParams} requiredState />}>
                    <Route element={<Backoffice />}>
                        <Route element={<Dashboard />} path="dashboard" />
                        <Route element={<Transactions />} path="transactions" />
                        <Route element={<Categories />} path="categories" />
                        <Route element={<Accounts />} path="accounts" />
                        <Route element={<Settings />} path="settings">
                            <Route element={<Account />} path="account" />
                            <Route element={<Profile />} path="profile" />
                            <Route element={<Preferences />} path="preferences" />
                        </Route>
                    </Route>
                    <Route element={<Auth />} path="auth">
                        <Route element={<Confirmation />} path="confirmation" />
                    </Route>
                    <Route element={<Setup />} path="setup">
                        <Route element={<AccountCreation />} path="accounts" />
                        <Route element={<CategoryCreation />} path="categories" />
                        <Route element={<TransactionCreation />} path="transactions" />
                    </Route>
                </Route>
                <Route element={<RouteWatch {...routeWatchParams} requiredState={false} />}>
                    <Route element={<Auth />} path="auth">
                        <Route element={<Login />} path="login" />
                        <Route element={<Signup />} path="signup" />
                        <Route element={<PasswordForgotten />} path="password-forgotten" />
                        <Route element={<PasswordReset />} path="password-reset/:token" />
                    </Route>
                    <Route element={<LandingPage />} path="/" />
                </Route>
            </Routes>
        </AnimatePresence>
    </App>
};

export default AppRoutes;