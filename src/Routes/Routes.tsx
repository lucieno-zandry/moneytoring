import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import App from "../App/App";
import Guest from "../partials/Guest/Guest";
import Auth from "../App/Auth/Auth";
import Login from "../App/Auth/Login/Login";
import Signup from "../App/Auth/Signup/Signup";
import Confirmation from "../App/Auth/Confirmation/Confirmation";
import PasswordForgotten from "../App/Auth/PasswordForgotten/PasswordForgotten";
import PasswordReset from "../App/Auth/PasswordReset/PasswordReset";
import Member from "../partials/Member/Member";
import Setup from "../App/Setup/Setup";
import Backoffice from "../App/Backoffice/Backoffice";
import Dashboard from "../App/Backoffice/Dashboard/Dashboard";
import Transactions from "../App/Backoffice/Transactions/Transactions";
import Categories from "../App/Backoffice/Categories/Categories";
import Accounts from "../App/Backoffice/Accounts/Accounts";

const AppRoutes = React.memo(() => {
    const location = useLocation();

    return <App>
        <AnimatePresence>
            <Routes location={location} key={location.key}>
                <Route element={<Guest />}>
                    <Route element={<Auth />} path="auth">
                        <Route element={<Login />} path="login" />
                        <Route element={<Signup />} path="signup" />
                        <Route element={<PasswordForgotten />} path="password-forgotten" />
                        <Route element={<PasswordReset />} path="password-reset/:token" />
                    </Route>
                </Route>
                <Route element={<Member />}>
                    <Route element={<Backoffice />}>
                        <Route element={<Dashboard />} path="/" />
                        <Route element={<Transactions />} path="transactions" />
                        <Route element={<Categories />} path="categories" />
                        <Route element={<Accounts />} path="accounts" />
                    </Route>
                    <Route element={<Auth />} path="auth">
                        <Route element={<Confirmation />} path="confirmation" />
                    </Route>
                    <Route element={<Setup />} path="setup/:step" />
                </Route>
            </Routes>
        </AnimatePresence>
    </App>
});

export default AppRoutes;