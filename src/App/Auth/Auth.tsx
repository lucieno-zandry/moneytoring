import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../partials/Logo/Logo";
import QuickSetting from "./QuickSetting/QuickSetting";
// import OtherLoginMethods from "./OtherLoginMethods/OtherLoginMethods";
import useAuth from "../../core/hooks/useAuth";

const Auth = React.memo(() => {
    const { user } = useAuth();

    return <div className="auth-page d-flex flex-wrap flex-sm-nowrap">
        <div className="left-side col-12 col-sm-6 d-none d-sm-block"></div>
        <div className="right-side col-12 col-sm-6 d-flex align-items-center justify-content-center flex-column gap-5">
            {!user
                && <QuickSetting />}
            <Logo />
            <Outlet />
            {/* {!user &&
                <OtherLoginMethods />} */}
        </div>
    </div>
});

export default Auth;