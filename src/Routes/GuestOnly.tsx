import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Guest from "../partials/Guest/Guest";
import Auth from "../App/Auth/Auth";
import Login from "../App/Auth/Login/Login";
import Signup from "../App/Auth/Signup/Signup";
import PasswordForgotten from "../App/Auth/PasswordForgotten/PasswordForgotten";
import PasswordReset from "../App/Auth/PasswordReset/PasswordReset";
import LandingPage from "../App/LandingPage/LandingPage";

export default React.memo(() => {
    const location = useLocation();

    return <Routes location={location} key={location.key}>
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
})