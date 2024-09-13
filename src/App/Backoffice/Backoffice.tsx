import { Outlet } from "react-router-dom";
import Navbar from "../../partials/Navbar/Navbar";
import Sidebar from "../../partials/Sidebar/Sidebar";
import React from "react";

const Backoffice = React.memo(() => {
    return <div className="backoffice d-flex">
        <Sidebar />
        <div className="col">
            <Navbar />
            <Outlet />
        </div>
    </div>
});

export default Backoffice;