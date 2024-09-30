import React from "react";
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

export default React.memo(() => {
    const location = useLocation();
    
    return <Routes location={location} key={location.key}>
        <Route element={<Member />}>
            <Route element={<Backoffice />}>
                <Route element={<Dashboard />} path="/" />
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
    </Routes>
})