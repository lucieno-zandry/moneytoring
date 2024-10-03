import React from "react";
import { AnimatePresence } from "framer-motion";
import App from "../App/App";
import { Route, Routes, useLocation } from "react-router-dom";
import Member from "../partials/Member/Member";
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
import Guest from "../partials/Guest/Guest";
import Login from "../App/Auth/Login/Login";
import Signup from "../App/Auth/Signup/Signup";
import PasswordForgotten from "../App/Auth/PasswordForgotten/PasswordForgotten";
import PasswordReset from "../App/Auth/PasswordReset/PasswordReset";
import LandingPage from "../App/LandingPage/LandingPage";

const AppRoutes = React.memo(() => {
    const location = useLocation();

    return <App>
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.key}>
                <Route element={<Member />}>
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
                    <Route element={<Setup />} path="setup/:step" />
                </Route>
                <Route element={<Guest />}>
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
});

export default AppRoutes;