import { Outlet } from "react-router-dom";
import Navbar from "../../partials/Navbar/Navbar";
import Sidebar from "../../partials/Sidebar/Sidebar";
import React from "react";
import useSidebar from "../../core/hooks/useSidebar";

const Backoffice = React.memo(() => {
    const { show, toggle } = useSidebar();

    const handleClick = React.useCallback(() => {
        if (!show) return;
        toggle();
    }, [show, toggle]);

    const style = React.useMemo(() => ({
        cursor: show ? 'pointer' : 'auto'
    }), [show])

    return <div className="backoffice d-flex">
        <Sidebar />
        <div className="right-side col" onClick={handleClick} style={style}>
            <Navbar />
            <Outlet />
        </div>
    </div>
});

export default Backoffice;