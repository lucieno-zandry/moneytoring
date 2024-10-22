import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../partials/Logo/Logo";
import QuickSetting from "./QuickSetting/QuickSetting";
// import OtherLoginMethods from "./OtherLoginMethods/OtherLoginMethods";
import useAuth from "../../core/hooks/useAuth";
import OtherLoginMethods from "./OtherLoginMethods/OtherLoginMethods";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Auth = React.memo(() => {
    const { user } = useAuth();

    return <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID!}>
        <div className="auth-page d-flex flex-wrap flex-sm-nowrap">
            <div className="left-side col-12 col-sm-6 d-none d-sm-block"></div>
            <div className="right-side col-12 col-sm-6 d-flex align-items-center justify-content-center flex-column gap-5">
                {!user
                    && <QuickSetting />}
                <Logo />
                <Outlet />
                {!user &&
                    <OtherLoginMethods />}
            </div>
        </div>
    </GoogleOAuthProvider>
});

export default Auth;