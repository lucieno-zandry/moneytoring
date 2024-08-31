import React from "react";
import { useRedirect } from "../../core/hooks/useRedirect";
import useAuth from "../../core/hooks/useAuth";
import { Outlet } from "react-router-dom";

const Member = React.memo(() => {
    useRedirect(true);

    const { user } = useAuth();

    if (user) {
        return <Outlet />
    }
});

export default Member;