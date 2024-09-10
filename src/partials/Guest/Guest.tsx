import React from "react";
import { useRedirect } from "../../core/hooks/useRedirect";
import { Outlet } from "react-router-dom";
import useAuth from "../../core/hooks/useAuth";

const Guest = React.memo(() => {
    useRedirect(false);

    const { user } = useAuth(state => state);

    if (user === false) {
        return <Outlet />
    }
});

export default Guest;