import React from "react";
import { useRedirect } from "../../core/hooks/useRedirect";
import useAuth from "../../core/hooks/useAuth";
import { Outlet } from "react-router-dom";

const Guest = React.memo(() => {
    useRedirect(false);

    const { user } = useAuth();

    if (user === false) {
        return <Outlet />
    }
});

export default Guest;